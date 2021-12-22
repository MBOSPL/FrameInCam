using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace FrameIncam.Domains.Models.Config
{
    [Table("config_user")]
    public class ConfigUser : IdentityUser<int>
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public Int16 Isactive { get; set; } = 1;
        [Column("created_by")]
        public string CreatedBy { get; set; }
        [Column("created_date")]
        public DateTime CreatedDate { get; set; }
        [Column("updated_by")]
        public string UpdatedBy { get; set; }
        [Column("updated_date")]
        public DateTime? UpdatedDate { get; set; }
    }
}