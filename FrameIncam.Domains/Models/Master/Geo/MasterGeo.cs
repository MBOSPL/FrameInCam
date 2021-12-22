using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Geo
{
    [Table("master_geo")]
    public class MasterGeo : Model
    {
        [Column("Geo_Code")]
        public long? GeoCode { get; set; }
        [Column("Geo_Name")]
        public string GeoName { get; set; }
        [Column("Geo_Head")]
        public int? GeoHead { get; set; }
        [Column("Geo_Level")]
        public int? GeoLevel { get; set; }
        [Column("Geo_type")]
        public int? GeoType { get; set; }
        [Column("Geo_TinNo")]
        public int? GeoTinNo { get; set; }
        [Column("Geo_StateCode")]
        public string GeoStateCode { get; set; }
        [Column("Geo_Latitude", TypeName = "decimal(18, 10)")]
        public decimal? GeoLatitude { get; set; }
        [Column("Geo_Longitude", TypeName = "decimal(18, 10)")]
        public decimal? GeoLongitude { get; set; }
        [Column("Geo_Isactive")]
        public int? GeoIsactive { get; set; }
    }
}
