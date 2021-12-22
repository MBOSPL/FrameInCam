using FrameIncam.Domains.Models.Master.FreeLancer;
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class FreeLancerProfile
    {
        public MasterFreeLancer FreeLancer { get; set; }
        public MasterFreeLancerAddress Address { get; set; }
        public MasterSubscriptionForFreeLancer Subscription { get; set; }
        public List<MasterFreeLancerPackage> Packages { get; set; }
        public MasterFreeLancerSubscriptions ActiveSubscription { get; set; }
    }
}