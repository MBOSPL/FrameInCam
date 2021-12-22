using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Models.Master.Vendor
{
    [Table("master_vendor_subscriptions")]
    public class MasterVendorSubscriptions : Model
    {
        [Column("vendor_id")]
        public int VendorId { get; set; }

        [Column("subscription_id")]
        public int SubscriptionId { get; set; }
        [Column("payment_id")]
        public int? PaymentId { get; set; }
        [Column("is_active")]
        public bool IsActive { get; set; }
        [Column("valid_from")]
        public DateTime ValidFrom { get; set; }
        [Column("valid_till")]
        public DateTime? ValidTill { get; set; }
        [Column("remaining_projects")]
        public int? RemainingProjects { get; set; }
        [Column("total_projects")]
        public int? TotalProjects { get; set; }
        [NotMapped]
        public string ValidTillIST { get; set; }

        public override async Task OnInitAsync(IServiceProvider p_provider)
        {
            await base.OnInitAsync(p_provider);
            string humanreadable = "";
            if (ValidTill != null)
            {
                try
                {
                    var valid_date = ValidTill.Value.Date.ToLocalTime();
                    humanreadable = valid_date.ToString("dd-MM-yyyy @h:mm tt");
                }
                catch(Exception e)
                {
                    humanreadable = "";
                }
            }
            ValidTillIST = humanreadable;
        }
    }
}
