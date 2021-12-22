using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common.Vendor.Search
{
    public class VendorSearchResult
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public VendorRating Rating { get; set; }
        public string Location { get; set; }
        public bool IsShortlisted { get; set; }
    }

    public class VendorRating
    {
        public int Value { get; set; }
        public int TotalReviews { get; set; }
    }
}
