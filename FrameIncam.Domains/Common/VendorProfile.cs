using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class VendorProfile
    {
        public MasterVendor Vendor { get; set; }
        public MasterVendorAddress Address { get; set; }
        public List<MasterVendorServiceMap> Services { get; set; }
        public MasterSubscription Subscription { get; set; }
        public List<MasterVendorPackage> Packages { get; set; }

        public MasterVendorSubscriptions ActiveSubscription { get; set; }
    }
}