using MySqlX.XDevAPI.Relational;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Models.Master.Subscription
{
    [Table("master_subscription_for_freelancer")]
    public class MasterSubscriptionForFreeLancer : Model
    {
        [Column("name")]
        public string Name { get; set; }
        [Column("price")]
        public decimal Price { get; set; }
        [Column("project_count")]
        public int ProjectCount { get; set; }
        [Column("price_per_project")]
        public decimal? PricePerProject { get; set; }
        [Column("duration_days")]
        public int? DurationDays { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("duration_months")]
        public int? DurationMonths { get; set; }
        public async override Task<bool> ValidateAsync(IServiceProvider p_provider)
        {
            bool isValid = await base.ValidateAsync(p_provider);
            if (!isValid)
                return isValid;

            return !string.IsNullOrEmpty(Name) && Price > 0 && ProjectCount > 0;
        }
    }
}
