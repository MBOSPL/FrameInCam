using FrameIncam.Domains.Models.Config;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class ActorProfile
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsHavingValidSubscription { get; set; }
        public string SubscriptionMessage { get; set; }
    }
}