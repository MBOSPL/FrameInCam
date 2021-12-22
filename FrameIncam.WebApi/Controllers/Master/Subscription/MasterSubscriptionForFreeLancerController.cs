using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains.Common;
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Repositories.Master.Subscription;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using FrameIncam.OAuth;
using FrameIncam.Domains.Repositories.Config;
using Microsoft.AspNetCore.Identity;
using FrameIncam.Domains.Models.Config;
using FrameIncam.Domains.Repositories.Transaction;
using FrameIncam.Domains.Models.Transaction;

namespace FrameIncam.WebApi.Controllers.Master.Vendor
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
    [Route("api/master/subscription-for-freelancer")]
    public class MasterSubscriptionForFreeLancerController : FrameIncamApiController<MasterSubscriptionForFreeLancer, IMasterSubscriptionForFreeLancerRepository>
    {
        [HttpPost("create-order/{p_SubscriptionId}")]
        public async Task <PaymentOrderResponse> CreateOrder(int p_SubscriptionId)
        {
            // Generate random receipt number for order
            PaymentOrderResponse paymentOrderResponse = null;
            MasterSubscriptionForFreeLancer masterSubscription = await this.Repository.GetByIdAsync(p_SubscriptionId);
            if(masterSubscription==null)
            {
                paymentOrderResponse = new PaymentOrderResponse
                {
                    status = false,
                    message = "Subscription Not Found"
                };
                return paymentOrderResponse;
            }
            ISecurityContext securityContext = this.Provider.GetService<ISecurityContext>();
            string userEmail = securityContext.GetEmail();

            UserManager<ConfigUser> userRepo = this.Provider.GetService<UserManager<ConfigUser>>();
            ConfigUser user =await  userRepo.FindByEmailAsync(userEmail);
            PaymentInitiateModel _requestData = new PaymentInitiateModel {
                name = user.Name,
                contactNumber = user.PhoneNumber,
                email=userEmail,
                amount = Decimal.ToInt32(masterSubscription.Price)
            };
            Random randomObj = new Random();
            string transactionId = randomObj.Next(10000000, 100000000).ToString();
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();
            if (string.IsNullOrEmpty(appSettings.Value.RazorPayKeyId) || string.IsNullOrEmpty(appSettings.Value.RazorPayKeySecret))
            {
                paymentOrderResponse = new PaymentOrderResponse
                {
                    status = false,
                    message = "Razor Pay Credentials are Missing Contact Admin"
                };
                return paymentOrderResponse;
            }
            var razorAPIKey = appSettings.Value.RazorPayKeyId;
            var razorAPISecret = appSettings.Value.RazorPayKeySecret;
            Razorpay.Api.RazorpayClient client = new Razorpay.Api.RazorpayClient(razorAPIKey, razorAPISecret);
            Dictionary<string, object> options = new Dictionary<string, object>();
            options.Add("amount", _requestData.amount * 100);  // Amount will in paise
            options.Add("receipt", transactionId);
            options.Add("currency", "INR");
            options.Add("payment_capture", "1"); // 1 - automatic  , 0 - manual
                                                 //options.Add("notes", "-- You can put any notes here --");
            Razorpay.Api.Order orderResponse = client.Order.Create(options);
            string orderId = orderResponse["id"].ToString();

            PaymentOrderModel orderModel = new PaymentOrderModel
            {
                order_id = orderResponse.Attributes["id"],
                key = razorAPIKey,
                amount = _requestData.amount * 100,
                currency = "INR",
                name = masterSubscription.Name+" "+masterSubscription.DurationMonths+" Months",
                email = _requestData.email,
                contactNumber = _requestData.contactNumber,
                address = _requestData.address,
                description = masterSubscription.Description,
                prefill=new Prefill()
                {
                    name= user.Name,
                    email=userEmail,
                    contact=user.PhoneNumber
                }
            };
            // Return on PaymentPage with Order data
            paymentOrderResponse = new PaymentOrderResponse
            {
                status = true,
                message = "Order Id Retrieved",
                paymentOrderModel = orderModel
            };
            ITrnPaymentRepository paymentRepo = this.Provider.GetService<ITrnPaymentRepository>();
            TrnPayment trnPayment = new TrnPayment()
            {
                CreatedBy=SecurityContext.GetEmail().ToString(),
                OrderId= orderModel.order_id,
                ReceiptId= transactionId,
                Status="pending"
            };
            await paymentRepo.InsertOneAsync(trnPayment);
            return paymentOrderResponse;
        }
    }
}