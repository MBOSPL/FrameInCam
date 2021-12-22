using MySqlX.XDevAPI.Relational;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.FreeLancer.Album
{
    [Table("master_freelancer_album_files")]
    public class MasterFreeLancerAlbumFiles : Model
    {
        [Column("album_id")]
        public int AlbumId { get; set; }
        [Column("freelancer_file_id")]
        public int FreeLancerFileId { get; set; }
    }
}