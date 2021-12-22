using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Config
{
    [Table("config_role")]
    public class ConfigRole : LogModel
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public Int16 Isactive { get; set; }
    }

    public class Role : IdentityRole<int>
    {

    }
}