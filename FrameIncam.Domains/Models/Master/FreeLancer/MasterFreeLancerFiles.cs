using MySqlX.XDevAPI.Relational;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.FreeLancer
{
    [Table("master_freelancer_files")]
    public class MasterFreeLancerFiles : LogModel
    {
        [Column("file_name")]
        public string FileName { get; set; }
        [Column("content_length")]
        public long ContentLength { get; set; }
        [Column("content_type")]
        public string ContentType { get; set; }
        [Column("file_type")]
        public string FileType { get; set; }
        [Column("freelancer_id")]
        public int? FreeLancerId { get; set; }
    }
}