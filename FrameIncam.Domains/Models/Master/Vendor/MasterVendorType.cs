using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Vendor
{
    [Table("master_vendor_type")]
    public class MasterVendorType : Model
    {
        [Column("type")]
        public string Type { get; set; }

        [Column("isactive")]
        public Int16 Isactive { get; set; }
    }
}
