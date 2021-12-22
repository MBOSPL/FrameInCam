using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common.Subscription
{
    public class PaymentRequestModel
    {
        public string checkout_log { get; set; }
        public bool custom_branding { get; set; }
        public string org_logo { get; set; }
        public string checkout_logo { get; set; }
        public string org_name { get; set; }
        public string razorpay_payment_id { get; set; }
        public string razorpay_order_id { get; set; }
        public string razorpay_signature { get; set; }
    }
}
