using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Vendor
{
    [Table("master_vendor_address")]
    public class MasterVendorAddress : LogModel
    {
        [Column("vendor_id")]
        public int VendorId { get; set; }
        [Column("pincode")]
        public string Pincode { get; set; }
        [Column("address_line_1")]
        public string AddressLine1 { get; set; }
        [Column("address_line_2")]
        public string AddressLine2 { get; set; }
        [Column("landmark")]
        public string Landmark { get; set; }
        [Column("city_geo_id")]
        public int CityGeoId { get; set; }
        [Column("state_geo_id")]
        public int StateGeoId { get; set; }
        [Column("isprimary")]
        public Int16 Isprimary { get; set; } = 1;
        [Column("isactive")]
        public Int16 Isactive { get; set; }
        [NotMapped]
        public string Cityname { get; set; }
        public bool IsValid()
        {
            return VendorId > 0 && !string.IsNullOrEmpty(Pincode) && !string.IsNullOrEmpty(AddressLine1);
        }
    }
}
