using FrameIncam.Domains.Models.Master.FreeLancer;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common.FreeLancer.Search
{
    public class FreeLancerDetailSearchResult
    {
        public int Id { get; set; }
        public MasterFreeLancer FreeLancer { get; set; }
        public FreeLancerRating Rating { get; set; }
        public bool IsShortlisted { get; set; }
        public int TotalLikes { get; set; }
        public decimal? PricePerDay { get; set; }
        public List<MasterFreeLancerPackage> Packages { get; set; }
        public MasterFreeLancerAddress Address { get; set; }
    }
}