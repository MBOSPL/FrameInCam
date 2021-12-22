using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common.Vendor.Search
{
    public class VendorSearchQuery : PaginationQuery
    {
        public int? VendorTypeId { get; set; }
        public int? GeoCityId { get; set; }
        public int? CustomerId { get; set; }
        public string Search { get; set; }
    }
}
