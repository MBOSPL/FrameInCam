using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class PaymentOrderResponse
    {
        public bool status { get; set; }
        public string message { get; set; }
        public PaymentOrderModel paymentOrderModel { get; set; } = null;
    }
}
