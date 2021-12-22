using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class PaymentOrderModel
    {
        public string order_id { get; set; }
        public string key { get; set; }
        public int amount { get; set; }
        public string currency { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string contactNumber { get; set; }
        public string address { get; set; }
        public string description { get; set; }

        public Prefill prefill { get; set; }
    }
    public class Prefill
    {
        public string name { get; set; }
        public string contact { get; set; }
        public string email { get; set; }
    }
}
