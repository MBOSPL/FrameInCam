using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.FreeLancer
{
    [Table("master_freelancer_package")]
    public class MasterFreeLancerPackage : LogModel
    {
        [Column("freelancer_id")]
        public int FreeLancerId { get; set; }

        [Column("description")]
        public string Description { get; set; }
        [Column("price_per_day")]
        public decimal PricePerDay { get; set; }
    }
}