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
    [Table("trn_vendor_freelancer_selection")]
    public class TrnVendorFreeLancerSelection : Model
    {
        [Column("freelancer_id")]
        public int FreelancerId { get; set; }
        [Column("vendor_id")]
        public int VendorId { get; set; }
    }
}