using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FrameIncam.Domains.Models.Master.FreeLancer
{
    [Table("master_freelancer_subscriptions")]
    public class MasterFreeLancerSubscriptions : Model
    {
        [Column("freelancer_id")]
        public int FreeLancerId { get; set; }

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
    }
}
