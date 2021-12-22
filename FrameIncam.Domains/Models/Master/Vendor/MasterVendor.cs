using MySqlX.XDevAPI.Relational;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.Vendor
{
    [Table("master_vendor")]
    public class MasterVendor : LogModel
    {
        [Column("name")]
        public string Name { get; set; }
        [Column("identifier")]
        public string Identifier { get; set; }
        [Column("type_id")]
        public int? TypeId { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("mobile")]
        public string Mobile { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("payment_terms")]
        public string PaymentTerms { get; set; }
        [Column("additional_cost")]
        public string AdditionalCost { get; set; }
        [Column("experience_lov_id")]
        public int ExperienceLovId { get; set; }
        [Column("site_url")]
        public string SiteUrl { get; set; }
        [Column("fb_url")]
        public string FbUrl { get; set; }
        [Column("instagram_url")]
        public string InstagramUrl { get; set; }
        [Column("youtube_url")]
        public string YoutubeUrl { get; set; }
        [Column("isactive")]
        public Int16 Isactive { get; set; } = 1;
        [NotMapped]
        public string Password { get; set; }
        public bool IsValid()
        {
            return !string.IsNullOrEmpty(Email) && !string.IsNullOrEmpty(Name);
        }
    }
}
