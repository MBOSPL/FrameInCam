using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common.Vendor.Search
{
    public class VendorDetailSearchResult
    {
        public int Id { get; set; }
        public MasterVendor Vendor { get; set; }
        public VendorRating Rating { get; set; }
        public bool IsShortlisted { get; set; }
        public int TotalLikes { get; set; }
        public decimal? PricePerDay { get; set; }
        public List<MasterVendorPackage> Packages { get; set; }
        public List<MasterVendorService> Services { get; set; }
        public MasterVendorAddress Address { get; set; }
    }
}