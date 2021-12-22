using FrameIncam.Domains.Models.Config;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class UserProfile
    {
        public ConfigUser User { get; set; }
        public ConfigRole Role { get; set; }
        public int? VendorId { get; set; }
        public int? CustomerId { get; set; }
        public int? FreeLancerId { get; set; }
    }
}