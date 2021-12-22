using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Geo
{
    [Table("master_geo_type")]
    public class MasterGeoType : Model
    {
        [Column("Geo_Type_Code")]
        public int? GeoTypeCode { get; set; }
        [Column("Geo_Type_Name")]
        public string GeoTypeName { get; set; }
        [Column("Geo_Type_Isactive")]
        public int? GeoTypeIsactive { get; set; }
    }
}