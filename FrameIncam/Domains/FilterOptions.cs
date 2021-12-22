using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains
{
    public class FilterOptions
    {
        public int? Limit { get; set; }
        public int? Skip { get; set; }
        public string OrderString { get; set; }
        public string OrderFashion { get; set; }
    }
}
