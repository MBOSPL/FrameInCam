using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Geo
{
    [Table("master_geo_level")]
    public class MasterGeoLevel : Model
    {
        [Column("Geo_Level_Code")]
        public int? GeoLevelCode { get; set; }
        [Column("Geo_Level_Name")]
        public string GeoLevelName { get; set; }
        [Column("Geo_Level_Isactive")]
        public int GeoLevelIsactive { get; set; }
    }
}
