using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains.Common;
using FrameIncam.Domains.Common.Subscription;
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Models.Transaction;
using FrameIncam.Domains.Repositories.Master.Subscription;
using FrameIncam.Domains.Repositories.Master.Vendor;
using FrameIncam.Domains.Repositories.Transaction;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System.Security.Cryptography;


namespace FrameIncam.WebApi.Controllers.Master.Vendor
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
    [Route("api/master/vendor-subscription")]
    public class MasterVendorSubscriptionController : FrameIncamApiController<MasterVendorSubscriptions, IMasterVendorSubscriptionsRepository>
    {
        [HttpPost("add-subscription/{p_subscriptionId}")]
        public async Task<FincamApiActionResult<bool>> AddSubscription(int p_subscriptionId,[FromBody] PaymentRequestModel p_paymentRequestModel)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            MasterSubscription subscription = null;
            int? vendorId = SecurityContext.GetVendorId();
            if (vendorId.HasValue)
            {
                if (p_subscriptionId == 0)
                    result.ErrorMsgs.Add("Subscription id is required");
                else
                {
                    IMasterSubscriptionRepository subRepo = this.Provider.GetService<IMasterSubscriptionRepository>();
                    subscription = await subRepo.GetByIdAsync(p_subscriptionId);
                    if (subscription == null)
                        result.ErrorMsgs.Add("Invalid subscription id");
                }

                if(result.ErrorMsgs.Count == 0)
                {
                    //verify signature
                    var orderId = p_paymentRequestModel.razorpay_order_id;
                    var paymentId = p_paymentRequestModel.razorpay_payment_id;
                    ITrnPaymentRepository paymentRepo = this.Provider.GetService<ITrnPaymentRepository>();
                    TrnPayment trnPayment = null;
                    trnPayment = await paymentRepo.GetByParams(null, orderId);
                    if(trnPayment==null)
                    {
                        result.ErrorMsgs.Add("Order Id Not Found! Payment Failed");
                        return result;
                    }
                    Dictionary<string, string> options = new Dictionary<string, string>();
                    options.Add("razorpay_order_id", p_paymentRequestModel.razorpay_order_id);
                    options.Add("razorpay_payment_id", p_paymentRequestModel.razorpay_payment_id);
                    options.Add("razorpay_signature", p_paymentRequestModel.razorpay_signature);
                    try { 
                    Razorpay.Api.Utils.verifyPaymentSignature(options);
                    }
                    catch(Razorpay.Api.Errors.SignatureVerificationError e)
                    {
                        result.ErrorMsgs.Add("Payment Failed! "+e.Message);
                        return result;
                    }

                    trnPayment.PaymentId = paymentId;
                    trnPayment.Response = JsonConvert.SerializeObject(p_paymentRequestModel);
                    trnPayment.UpdatedBy = SecurityContext.GetEmail();
                    trnPayment.UpdatedDate = DateTime.UtcNow;
                    trnPayment.Status = "received";
                    paymentRepo.UpdateOneAsync(trnPayment);
                    var validMonth = subscription.DurationMonths;
                    MasterVendorSubscriptions vSub = new MasterVendorSubscriptions()
                    {
                        VendorId = vendorId.Value,
                        SubscriptionId = p_subscriptionId,
                        PaymentId = trnPayment.id,
                        ValidFrom=DateTime.UtcNow,
                        ValidTill = DateTime.UtcNow.AddMonths((int)validMonth),
                        IsActive =true
                    };

                    await this.Repository.AddSubscription(vSub);
                    result.Result = true;
                }
            }
            else
                result.ErrorMsgs.Add("Vendor is required");

            return result;
        }

        [HttpGet("get-active-subscription")]
        public async Task<MasterSubscription> GetActiveSubscription()
        {
            int? vendorId = SecurityContext.GetVendorId();
            if (!vendorId.HasValue)
                return default(MasterSubscription);

            return await this.Repository.GetActiveSubscription(vendorId.Value);
        }
        [HttpGet("get-active-vendor-subscription")]
        public async Task<MasterVendorSubscriptions> GetActiveVendorSubscription()
        {
            int? vendorId = SecurityContext.GetVendorId();
            if (!vendorId.HasValue)
                return default(MasterVendorSubscriptions);
            MasterVendorSubscriptions masterVendorSubscriptions = await this.Repository.GetActiveVendorSubscription(vendorId.Value);
            if(masterVendorSubscriptions!=null)
            {
                if (masterVendorSubscriptions.ValidTill != null)
                {
                    string humanreadable = "";
                    try
                    {
                        var valid_date = masterVendorSubscriptions.ValidTill.Value.ToLocalTime();
                        humanreadable = valid_date.ToString("dd-MM-yyyy @hh:mm tt");
                    }
                    catch (Exception e)
                    {
                        humanreadable = "";
                    }
                    masterVendorSubscriptions.ValidTillIST = humanreadable;
                }
            }
            return masterVendorSubscriptions ;
        }
    }
}