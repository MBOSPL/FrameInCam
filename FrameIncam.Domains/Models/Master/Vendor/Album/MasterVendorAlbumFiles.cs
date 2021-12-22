using MySqlX.XDevAPI.Relational;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Vendor.Album
{
    [Table("master_vendor_album_files")]
    public class MasterVendorAlbumFiles : Model
    {
        [Column("album_id")]
        public int AlbumId { get; set; }
        [Column("vendor_file_id")]
        public int VendorFileId { get; set; }
    }
}