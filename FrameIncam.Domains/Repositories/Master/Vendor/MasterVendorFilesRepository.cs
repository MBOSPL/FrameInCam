using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Vendor;
using IO = System.IO;

namespace FrameIncam.Domains.Repositories.Master.Vendor
{
    public interface IMasterVendorFilesRepository : IRepository<MasterVendorFiles>
    {
        Task<List<MasterVendorFiles>> GetByParamsAsync(int? vendorId, string mFileType);
        Task<bool> ClearOldFiles(int? vendorId, string mFileType,int? fileId=0,string projectThumbnailPath="");
        Task<MasterVendorFiles> GetDefaultFile(int Id,string mFileType);
        Task<bool> setProfilePicture(int? p_vendorId,int? p_fileId);
    }
    public class MasterVendorFilesRepository : Repository<MasterVendorFiles>, IMasterVendorFilesRepository
    {
        public MasterVendorFilesRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {
        }

        public async Task<bool> ClearOldFiles(int? mVendorId,string mFileType,int? fileId=0,string projectThumbnailPath="")
        {
            try { 
            List<Expression<Func<MasterVendorFiles, bool>>> filterConditions = new List<Expression<Func<MasterVendorFiles, bool>>>();
            Expression<Func<MasterVendorFiles, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.VendorId, OperationExpression.Equals, mVendorId));
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.FileType, OperationExpression.Equals, mFileType));
            if(fileId>0)
            {
                    filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.id, OperationExpression.Equals, fileId));
            }
             if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendorFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;
            List<MasterVendorFiles> files = await this.GetManyAsync(filters);
             foreach(MasterVendorFiles file in files )
             {
                    string projectFilePath = IO.Path.Combine(projectThumbnailPath, file.FileName);
                    if (IO.File.Exists(projectFilePath))
                        IO.File.Delete(projectFilePath);
             }
                await this.GetQueryable(filters).DeleteFromQueryAsync();

            return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }

        public async Task<List<MasterVendorFiles>> GetByParamsAsync(int? mVendorId,string mFileType)
        {
            List<Expression<Func<MasterVendorFiles, bool>>> filterConditions = new List<Expression<Func<MasterVendorFiles, bool>>>();
            Expression<Func<MasterVendorFiles, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.VendorId, OperationExpression.Equals, mVendorId));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.FileType, OperationExpression.Equals, mFileType));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendorFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetManyAsync(filters);
        }
        public async Task<MasterVendorFiles> GetDefaultFile(int Id, string mFileType)
        {
            List<Expression<Func<MasterVendorFiles, bool>>> filterConditions = new List<Expression<Func<MasterVendorFiles, bool>>>();
            Expression<Func<MasterVendorFiles, bool>> filters = null;
            Expression<Func<MasterVendorFiles, bool>> filters2 = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.VendorId, OperationExpression.Equals, Id));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.FileType, OperationExpression.Equals, mFileType));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendorFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            if (filters == null)
                return default;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.IsSelectedForProfile, OperationExpression.Equals, true));
            foreach (Expression<Func<MasterVendorFiles, bool>> filterCondition in filterConditions)
               filters2 = (filters2 == null ? filterCondition : filters2.And(filterCondition));

            MasterVendorFiles masterVendorProfilePic = await this.GetOneAsync(filters2);
            if(masterVendorProfilePic!=null)
            {
                return masterVendorProfilePic;
            }
            return await this.GetOneAsync(filters);
        }

        public async Task<bool> setProfilePicture(int? p_vendorId,int? p_fileId)
        {
            List<Expression<Func<MasterVendorFiles, bool>>> filterConditions = new List<Expression<Func<MasterVendorFiles, bool>>>();
            Expression<Func<MasterVendorFiles, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.VendorId, OperationExpression.Equals, p_vendorId));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.FileType, OperationExpression.Equals, "photos"));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendorFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            await this.GetQueryable(filters).UpdateFromQueryAsync(r => new MasterVendorFiles { IsSelectedForProfile = false });

            List<Expression<Func<MasterVendorFiles, bool>>> filterConditionstwo = new List<Expression<Func<MasterVendorFiles, bool>>>();
            Expression<Func<MasterVendorFiles, bool>> filterstwo = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.id, OperationExpression.Equals, p_fileId));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendorFiles, bool>> filterCondition in filterConditions)
                    filterstwo = (filterstwo == null ? filterCondition : filterstwo.And(filterCondition));
            }


            int updatedcount = await this.GetQueryable(filterstwo).UpdateFromQueryAsync(r => new MasterVendorFiles { IsSelectedForProfile = true });

            if(updatedcount>0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
