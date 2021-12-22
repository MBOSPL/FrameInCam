using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Lov
{
    [Table("master_lov")]
    public class MasterLov : Model
    {
        [Column("desc")]
        public string Desc { get; set; }
        [Column("type")]
        public string Type { get; set; }
        [Column("parent_id")]
        public int? ParentId { get; set; }
        [Column("isactive")]
        public Int16 Isactive { get; set; }
    }
}
