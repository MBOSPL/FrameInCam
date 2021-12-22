using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class CustomerProfile
    {
        public int? customerId { get; set; }
        public string customerAddressLine1 { get; set; }
        public string customerAddressLine2 { get; set; }
        public string customerAltMobileNo { get; set; }
        public string customerCity { get; set; }
        public string customerCode { get; set; }
        public string customerEmail { get; set; }
        public string customerMobileNo { get; set; }
        public string customerName { get; set; }
        public string customerPin { get; set; }
    }
}
