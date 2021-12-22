using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common.Vendor
{
    public class VendorCustomerReviewRequest
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public int Ratings { get; set; }
        public string Email { get; set; }
        public int vendor_id { get; set; }
    }
}
