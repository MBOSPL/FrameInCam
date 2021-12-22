using FrameIncam.Domains.Repositories.Transaction;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace FrameIncam.Domains.Models.Transaction
{
    [Table("trn_customer_vendor_selection")]
    public class TrnCustomerVendorSelection : Model
    {
        [Column("customer_id")]
        public int CustomerId { get; set; }
        [Column("vendor_id")]
        public int VendorId { get; set; }
    }
}