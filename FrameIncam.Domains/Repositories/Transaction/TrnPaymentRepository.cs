using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Transaction;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using System.Linq.Expressions;
using FrameIncam.Domains.Extensions;

namespace FrameIncam.Domains.Repositories.Transaction
{
    public interface ITrnPaymentRepository : IRepository<TrnPayment>
    {
        Task<TrnPayment> GetByParams(int? p_id, string orderId);
    }
    public class TrnPaymentRepository : Repository<TrnPayment>, ITrnPaymentRepository
    {
        public TrnPaymentRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        public async Task<TrnPayment> GetByParams(int? p_id, string orderId)
        {
            List<Expression<Func<TrnPayment, bool>>> filterConditions = new List<Expression<Func<TrnPayment, bool>>>();
            Expression<Func<TrnPayment, bool>> filters = null;

            if (p_id.HasValue && p_id > 0)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnPayment>(a => a.id, OperationExpression.Equals, p_id.Value));

            if (!string.IsNullOrEmpty(orderId))
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnPayment>(a => a.OrderId, OperationExpression.Equals, orderId));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnPayment, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetOneAsync(filters);
        }
    }
}
