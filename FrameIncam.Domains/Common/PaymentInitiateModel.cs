using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class PaymentInitiateModel
    {
        public string name { get; set; }
        public string email { get; set; }
        public string contactNumber { get; set; }
        public string address { get; set; }
        public int amount { get; set; }
    }
}
