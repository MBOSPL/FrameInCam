using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common.FreeLancer.Search
{
    public class FreeLancerSearchQuery : PaginationQuery
    {
        public int? FreeLancerTypeId { get; set; }
        public int? GeoCityId { get; set; }
        public int? VendorId { get; set; }
        public string Search { get; set; }
    }
}
