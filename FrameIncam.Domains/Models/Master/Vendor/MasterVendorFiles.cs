using MySqlX.XDevAPI.Relational;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Vendor
{
    [Table("master_vendor_files")]
    public class MasterVendorFiles : LogModel
    {
        [Column("file_name")]
        public string FileName { get; set; }
        [Column("content_length")]
        public long ContentLength { get; set; }
        [Column("content_type")]
        public string ContentType { get; set; }
        [Column("file_type")]
        public string FileType { get; set; }
        [Column("vendor_id")]
        public int? VendorId { get; set; }

        [Column("is_selected_for_profile")]
        public bool IsSelectedForProfile { get; set; }
    }
}