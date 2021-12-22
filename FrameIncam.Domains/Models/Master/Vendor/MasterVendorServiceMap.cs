using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Vendor
{
    [Table("master_vendor_service_map")]
    public class MasterVendorServiceMap : Model
    {
        [Column("vendor_id")]
        public int VendorId { get; set; }
        [Column("service_id")]
        public int ServiceId { get; set; }
    }
}