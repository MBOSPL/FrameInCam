using FrameIncam.Domains.Common.Projects;
using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Models.Transaction;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Transaction
{
    public interface ITrnVendorFreeLancerSelectionRepository : IRepository<TrnVendorFreeLancerSelection>
    {
        Task<TrnVendorFreeLancerSelection> GetByParams(int p_freeLancerId,int p_customerId);
        Task<List<TrnVendorFreeLancerSelection>> GetByFreeLancerId(int p_vendorId);
    }

    public class TrnVendorFreeLancerSelectionRepository : Repository<TrnVendorFreeLancerSelection>, ITrnVendorFreeLancerSelectionRepository
    {
        public TrnVendorFreeLancerSelectionRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        public async Task<TrnVendorFreeLancerSelection> GetByParams(int p_vendorId,int p_freeLancerId)
        {
            List<Expression<Func<TrnVendorFreeLancerSelection, bool>>> filterConditions = new List<Expression<Func<TrnVendorFreeLancerSelection, bool>>>();
            Expression<Func<TrnVendorFreeLancerSelection, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnVendorFreeLancerSelection>(a => a.FreelancerId, OperationExpression.Equals, p_freeLancerId));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnVendorFreeLancerSelection>(a => a.VendorId, OperationExpression.Equals, p_vendorId));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnVendorFreeLancerSelection, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetOneAsync(filters);
        }
        public async Task<List<TrnVendorFreeLancerSelection>> GetByFreeLancerId(int p_freeLancerId)
        {
            List<Expression<Func<TrnVendorFreeLancerSelection, bool>>> filterConditions = new List<Expression<Func<TrnVendorFreeLancerSelection, bool>>>();
            Expression<Func<TrnVendorFreeLancerSelection, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnVendorFreeLancerSelection>(a => a.FreelancerId, OperationExpression.Equals, p_freeLancerId));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnVendorFreeLancerSelection, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetManyAsync(filters);
        }
    }
}