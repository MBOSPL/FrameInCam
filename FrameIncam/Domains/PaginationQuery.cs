using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains
{
    public class PaginationQuery
    {
        public int RecordsPerPage { get; set; }
        public int PageIndex { get; set; }
    }
}
