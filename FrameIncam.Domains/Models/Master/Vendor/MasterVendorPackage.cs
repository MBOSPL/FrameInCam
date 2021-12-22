using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Vendor
{
    [Table("master_vendor_package")]
    public class MasterVendorPackage : LogModel
    {
        [Column("vendor_id")]
        public int VendorId { get; set; }

        [Column("description")]
        public string Description { get; set; }
        [Column("price_per_day")]
        public decimal PricePerDay { get; set; }
    }
}