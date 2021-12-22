using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.FreeLancer;

namespace FrameIncam.Domains.Repositories.Master.FreeLancer
{
    public interface IMasterFreeLancerFilesRepository : IRepository<MasterFreeLancerFiles>
    {
        Task<List<MasterFreeLancerFiles>> GetByParamsAsync(int? vendorId, string mFileType);
        Task<bool> ClearOldFiles(int? vendorId, string mFileType);
        Task<MasterFreeLancerFiles> GetDefaultFile(int Id,string mFileType);
    }
    public class MasterFreeLancerFilesRepository : Repository<MasterFreeLancerFiles>, IMasterFreeLancerFilesRepository
    {
        public MasterFreeLancerFilesRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {
        }

        public async Task<bool> ClearOldFiles(int? mFreeLancerId,string mFileType)
        {
            try { 
            List<Expression<Func<MasterFreeLancerFiles, bool>>> filterConditions = new List<Expression<Func<MasterFreeLancerFiles, bool>>>();
            Expression<Func<MasterFreeLancerFiles, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancerFiles>(a => a.FreeLancerId, OperationExpression.Equals, mFreeLancerId));
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancerFiles>(a => a.FileType, OperationExpression.Equals, mFileType));
                if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterFreeLancerFiles, bool>> filterCondition in filterConditions)
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

        public async Task<List<MasterFreeLancerFiles>> GetByParamsAsync(int? mFreeLancerId,string mFileType)
        {
            List<Expression<Func<MasterFreeLancerFiles, bool>>> filterConditions = new List<Expression<Func<MasterFreeLancerFiles, bool>>>();
            Expression<Func<MasterFreeLancerFiles, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancerFiles>(a => a.FreeLancerId, OperationExpression.Equals, mFreeLancerId));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancerFiles>(a => a.FileType, OperationExpression.Equals, mFileType));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterFreeLancerFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetManyAsync(filters);
        }
        public async Task<MasterFreeLancerFiles> GetDefaultFile(int Id, string mFileType)
        {
            List<Expression<Func<MasterFreeLancerFiles, bool>>> filterConditions = new List<Expression<Func<MasterFreeLancerFiles, bool>>>();
            Expression<Func<MasterFreeLancerFiles, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancerFiles>(a => a.FreeLancerId, OperationExpression.Equals, Id));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancerFiles>(a => a.FileType, OperationExpression.Equals, mFileType));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterFreeLancerFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            if (filters == null)
                return default;

            return await this.GetOneAsync(filters);
        }
    }
}
