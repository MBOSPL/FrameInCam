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
    public interface ITrnCustomerVendorSelectionRepository : IRepository<TrnCustomerVendorSelection>
    {
        Task<TrnCustomerVendorSelection> GetByParams(int p_customerId, int p_vendorId);
        Task<List<TrnCustomerVendorSelection>> GetByVendorId(int p_vendorId);
    }

    public class TrnCustomerVendorSelectionRepository : Repository<TrnCustomerVendorSelection>, ITrnCustomerVendorSelectionRepository
    {
        public TrnCustomerVendorSelectionRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        public async Task<TrnCustomerVendorSelection> GetByParams(int p_customerId,int p_vendorId)
        {
            List<Expression<Func<TrnCustomerVendorSelection, bool>>> filterConditions = new List<Expression<Func<TrnCustomerVendorSelection, bool>>>();
            Expression<Func<TrnCustomerVendorSelection, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnCustomerVendorSelection>(a => a.CustomerId, OperationExpression.Equals, p_customerId));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnCustomerVendorSelection>(a => a.VendorId, OperationExpression.Equals, p_vendorId));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnCustomerVendorSelection, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetOneAsync(filters);
        }
        public async Task<List<TrnCustomerVendorSelection>> GetByVendorId(int p_vendorId)
        {
            List<Expression<Func<TrnCustomerVendorSelection, bool>>> filterConditions = new List<Expression<Func<TrnCustomerVendorSelection, bool>>>();
            Expression<Func<TrnCustomerVendorSelection, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnCustomerVendorSelection>(a => a.VendorId, OperationExpression.Equals, p_vendorId));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnCustomerVendorSelection, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetManyAsync(filters);
        }
    }
}