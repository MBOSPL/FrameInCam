using MySqlX.XDevAPI.Relational;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.FreeLancer.Album
{
    [Table("master_freelancer_album")]
    public class MasterFreeLancerAlbum : LogModel
    {
        [Column("album_title")]
        public string AlbumTitle { get; set; }
        [Column("album_note")]
        public string AlbumNote { get; set; }
        [Column("album_location")]
        public string AlbumLocation { get; set; }
        [Column("isactive")]
        public Int16 Isactive { get; set; } = 1;

        public bool IsValid()
        {
            return !string.IsNullOrEmpty(AlbumTitle);
        }
    }
}