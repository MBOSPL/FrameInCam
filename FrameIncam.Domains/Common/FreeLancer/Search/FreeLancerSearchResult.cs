using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common.FreeLancer.Search
{
    public class FreeLancerSearchResult
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public FreeLancerRating Rating { get; set; }
        public string Location { get; set; }
        public bool IsShortlisted { get; set; }
    }

    public class FreeLancerRating
    {
        public int Value { get; set; }
        public int TotalReviews { get; set; }
    }
}
