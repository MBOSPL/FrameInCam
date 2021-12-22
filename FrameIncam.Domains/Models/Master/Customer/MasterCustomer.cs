using MySqlX.XDevAPI.Relational;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Customer
{
    [Table("master_customer")]
    public class MasterCustomer : LogModel
    {
        [Column("code")]
        public int? Code { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("mobile")]
        public string Mobile { get; set; }
        [Column("alternate_mobile")]
        public string AlternateMobile { get; set; }
        [Column("pincode")]
        public string Pincode { get; set; }
        [Column("address_line_1")]
        public string AddressLine1 { get; set; }
        [Column("address_line_2")]
        public string AddressLine2 { get; set; }
        [Column("city_geo_id")]
        public int? CityGeoId { get; set; }
        [Column("city")]
        public string City { get; set; }
        [Column("state_geo_id")]
        public int? StateGeoId { get; set; }
        [Column("state")]
        public string State { get; set; }
        [Column("is_active")]
        public Int16 IsActive { get; set; } = 1;
        [NotMapped]
        public string Password { get; set; }
        public bool IsValid()
        {
            return !string.IsNullOrEmpty(Email) && !string.IsNullOrEmpty(Name) && !string.IsNullOrEmpty(Mobile);
        }
    }
}
