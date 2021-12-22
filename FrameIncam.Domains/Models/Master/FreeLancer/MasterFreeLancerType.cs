using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.FreeLancer
{
    [Table("master_freelancer_type")]
    public class MasterFreeLancerType : Model
    {
        [Column("type")]
        public string Type { get; set; }

        [Column("isactive")]
        public Int16 Isactive { get; set; }
    }
}
