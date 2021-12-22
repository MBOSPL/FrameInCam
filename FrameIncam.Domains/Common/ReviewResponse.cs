using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class ReviewResponse
    {
        public int VendorId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public int Ratings { get; set; }
        public bool IsShow { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string CustomerName { get; set; }
        public string Replay { get; set; }
    }
}
