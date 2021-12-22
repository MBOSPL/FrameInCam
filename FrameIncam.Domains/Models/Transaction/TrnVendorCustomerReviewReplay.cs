using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Threading.Tasks;
using FrameIncam.Domains.Repositories.Transaction;
using Microsoft.Extensions.DependencyInjection;
using FrameIncam.Domains.Repositories.Master.Customer;
using FrameIncam.Domains.Models.Master.Customer;

namespace FrameIncam.Domains.Models.Transaction
{
    [Table("trn_vendor_customer_review_replays")]
    public class TrnVendorCustomerReviewReplay:Model
    {
        [Column("vendor_id")]
        public int VendorId { get; set; }
        [Column("review_id")]
        public int ReviewId { get; set; }
        [Column("body")]
        public string Body { get; set; }
        [Column("created_by")]
        public string CreatedBy { get; set; }
        [Column("created_date")]
        public DateTime CreatedDate { get; set; }
        [Column("updated_by")]
        public string UpdatedBy { get; set; }
        [Column("updated_date")]
        public DateTime? UpdatedDate { get; set; }
    }
}
