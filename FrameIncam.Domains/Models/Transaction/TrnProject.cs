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
    [Table("trn_project")]
    public class TrnProject : Model
    {
        [Column("identifier")]
        public string Identifier { get; set; }
        [Column("P_Code")]
        public int Code { get; set; }
        [Column("P_ProjectName")]
        public string ProjectName { get; set; }
        [Column("P_Created_Date")]
        public DateTime CreatedDate { get; set; }
        [Column("P_Project_Date")]
        public DateTime? ProjectDate { get; set; }
        [Column("P_Vendor_Id")]
        public int VendorId { get; set; }
        [Column("P_Customer_Id")]
        public int CustomerId { get; set; }
        [Column("P_GSTNo")]
        public string GSTNo { get; set; }
        [Column("P_Photographer")]
        public int Photographer { get; set; }
        [Column("P_Designer")]
        public int Designer { get; set; }
        [Column("P_Project_Value")]
        public decimal ProjectValue { get; set; }
        [Column("P_AdvanceAmt")]
        public decimal AdvanceAmt { get; set; }
        [Column("P_Folder")]
        public string Folder { get; set; }
        [Column("P_Equipments")]
        public string Equipments { get; set; }
        [Column("P_Key")]
        public string Key { get; set; }
        [Column("P_URL")]
        public string Url { get; set; }
        [Column("P_Status")]
        public string Status { get; set; }
        [Column("P_Isactive")]
        public Int16 IsActive { get; set; } = 1;
        [Column("Batch")]
        public int Batch { get; set; }
        [Column("B_Batch")]
        public int BBatch { get; set; }
        [Column("C_Code")]
        public int? CustomerCode { get; set; }
        [Column("P_CustomerName")]
        public string CustomerName { get; set; }
        [Column("P_EmailId")]
        public string CustomerEmail { get; set; }
        [Column("P_MobileNo")]
        public string CustomerMobileNo { get; set; }
        [Column("P_Alt_MobileNo")]
        public string CustomerAltMobileNo { get; set; }
        [Column("P_Address1")]
        public string CustomerAddress1 { get; set; }
        [Column("P_Address2")]
        public string CustomerAddress2 { get; set; }
        [Column("P_City")]
        public string CustomerCity { get; set; }
        [Column("P_Pin")]
        public string CustomerPin { get; set; }
        [NotMapped]
        public int FileCount { get; set; }
        [Column("P_SubscriptionId")]
        public int? SubscriptionId { get; set; }
        public override async Task OnInitAsync(IServiceProvider p_provider)
        {
            await base.OnInitAsync(p_provider);

            if (id > 0)
            {
                ITrnProjectFilesRepository filesRepo = p_provider.GetService<ITrnProjectFilesRepository>();
                FileCount = await filesRepo.GetFileCountByProject(id);
            }
        }
    }
}