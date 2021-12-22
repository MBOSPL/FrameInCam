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
    [Table("trn_vendor_customer_reviews")]
    public class TrnVendorCustomerReview : Model
    {
        [Column("vendor_id")]
        public int VendorId { get; set; }
        [Column("title")]
        public string Title { get; set; }
        [Column("body")]
        public string Body { get; set; }
        [Column("ratings")]
        public int Ratings { get; set; }
        [Column("is_show")]
        public bool IsShow { get; set; }
        [Column("created_by")]
        public string CreatedBy { get; set; }
        [Column("created_date")]
        public DateTime CreatedDate { get; set; }
        [Column("updated_by")]
        public string UpdatedBy { get; set; }
        [Column("updated_date")]
        public DateTime? UpdatedDate { get; set; }
        [NotMapped]
        public string CustomerName { get; set; }
        [NotMapped]
        public string Reply { get; set; }
        public override async Task OnInitAsync(IServiceProvider p_provider)
        {
            await base.OnInitAsync(p_provider);

            if (!string.IsNullOrEmpty(CreatedBy))
            {
                IMasterCustomerRepository custRepo = p_provider.GetService<IMasterCustomerRepository>();
                MasterCustomer masterCustomer= await custRepo.GetByParams(CreatedBy, null);
                if (masterCustomer != null)
                {
                    CustomerName = masterCustomer.Name;
                }
                else
                    CustomerName = CreatedBy;
            }
            else
                CustomerName = CreatedBy;
        }
    }
}
