using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Vendor;

namespace FrameIncam.Domains.Repositories.Master.Vendor
{
    public interface IMasterVendorFilesRepository : IRepository<MasterVendorFiles>
    {
        Task<List<MasterVendorFiles>> GetByParamsAsync(int? vendorId, string mFileType);
        Task<bool> ClearOldFiles(int? vendorId, string mFileType);
        Task<MasterVendorFiles> GetDefaultFile(int Id,string mFileType);
    }
    public class MasterVendorFilesRepository : Repository<MasterVendorFiles>, IMasterVendorFilesRepository
    {
        public MasterVendorFilesRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {
        }

        public async Task<bool> ClearOldFiles(int? mVendorId,string mFileType)
        {
            try { 
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
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.VendorId, OperationExpression.Equals, Id));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorFiles>(a => a.FileType, OperationExpression.Equals, mFileType));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendorFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            if (filters == null)
                return default;

            return await this.GetOneAsync(filters);
        }
    }
}
