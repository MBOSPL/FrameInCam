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
using FrameIncam.Domains.Models.Master.FreeLancer;
using FrameIncam.Domains.Repositories.Master.FreeLancer;

namespace FrameIncam.WebApi.Controllers.Master.FreeLancer
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
    [Route("api/master/freelancer-subscription")]
    public class MasterFreeLancerSubscriptionController : FrameIncamApiController<MasterFreeLancerSubscriptions, IMasterFreeLancerSubscriptionsRepository>
    {
        [HttpPost("add-subscription/{p_subscriptionId}")]
        public async Task<FincamApiActionResult<bool>> AddSubscription(int p_subscriptionId,[FromBody] PaymentRequestModel p_paymentRequestModel)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };

            int? freeLancerId = SecurityContext.GetFreeLancerId();
            MasterSubscriptionForFreeLancer subscription = null;
            if (freeLancerId.HasValue)
            {
                if (p_subscriptionId == 0)
                    result.ErrorMsgs.Add("Subscription id is required");
                else
                {
                    IMasterSubscriptionForFreeLancerRepository subRepo = this.Provider.GetService<IMasterSubscriptionForFreeLancerRepository>();
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
                    MasterFreeLancerSubscriptions vSub = new MasterFreeLancerSubscriptions()
                    {
                        FreeLancerId = freeLancerId.Value,
                        SubscriptionId = p_subscriptionId,
                        PaymentId = trnPayment.id,
                        ValidFrom = DateTime.UtcNow,
                        ValidTill = DateTime.UtcNow.AddMonths((int)validMonth),
                        IsActive = true
                    };

                    await this.Repository.AddSubscription(vSub);
                    result.Result = true;
                }
            }
            else
                result.ErrorMsgs.Add("FreeLancer is required");

            return result;
        }

        [HttpGet("get-active-subscription")]
        public async Task<MasterSubscriptionForFreeLancer> GetActiveSubscription()
        {
            int? freeLancerId = SecurityContext.GetFreeLancerId();
            if (!freeLancerId.HasValue)
                return default(MasterSubscriptionForFreeLancer);

            return await this.Repository.GetActiveSubscription(freeLancerId.Value);
        }
        [HttpGet("get-active-freelancer-subscription")]
        public async Task<MasterFreeLancerSubscriptions> GetActiveFreeLancerSubscription()
        {
            int? freeLancerId = SecurityContext.GetFreeLancerId();
            if (!freeLancerId.HasValue)
                return default(MasterFreeLancerSubscriptions);
            MasterFreeLancerSubscriptions masterFreeLancerSubscriptions = await this.Repository.GetActiveFreeLancerSubscription(freeLancerId.Value);
            if (masterFreeLancerSubscriptions != null)
            {
                if (masterFreeLancerSubscriptions.ValidTill != null && masterFreeLancerSubscriptions.ValidTill > DateTime.UtcNow)
                {
                    string humanreadable = "";
                    try
                    {
                        var valid_date = masterFreeLancerSubscriptions.ValidTill.Value.ToLocalTime();
                        humanreadable = valid_date.ToString("dd-MM-yyyy @hh:mm tt");
                    }
                    catch (Exception e)
                    {
                        humanreadable = "";
                    }
                    masterFreeLancerSubscriptions.ValidTillIST = humanreadable;
                }
            }
            return masterFreeLancerSubscriptions;
        }
    }
}