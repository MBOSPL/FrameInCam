using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Vendor
{
    [Table("master_vendor_service")]
    public class MasterVendorService : Model
    {
        [Column("desc")]
        public string Desc { get; set; }
        [Column("type_id")]
        public int? Typeid { get; set; }
        [Column("isactive")]
        public Int16 Isactive { get; set; }
    }
}
