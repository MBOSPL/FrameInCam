using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Threading.Tasks;
using FrameIncam.Domains.Repositories.Transaction;
using Microsoft.Extensions.DependencyInjection; 
namespace FrameIncam.Domains.Models.Transaction
{
    [Table("trn_project_files")]
    public class TrnProjectFiles : LogModel
    {
        [Column("project_id")]
        public int ProjectId { get; set; }
        [Column("file_name")]
        public string FileName { get; set; }
        [Column("file_type")]
        public string FileType { get; set; }
        [Column("content_length")]
        public long ContentLength { get; set; }
        [Column("content_type")]
        public string ContentType { get; set; }
        [Column("is_approved")]
        public int IsApproved { get; set; } = 0;
        [Column("approved_by")]
        public string ApprovedBy { get; set; }
        [Column("approved_date")]
        public DateTime? ApprovedDate { get; set; }
        [NotMapped]
        public int? Thumbnail { get; set; }
        public override async Task OnInitAsync(IServiceProvider p_provider)
        {
            await base.OnInitAsync(p_provider);

            if (id > 0)
            {
                ITrnProjectFilesRepository filesRepo = p_provider.GetService<ITrnProjectFilesRepository>();
                Thumbnail = filesRepo.GetThumbnailById(FileName);
            }
        }
    }
}