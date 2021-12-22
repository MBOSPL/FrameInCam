using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Subscription;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Master.Subscription
{
    public interface IMasterSubscriptionRepository : IRepository<MasterSubscription>
    {
        Task<List<MasterSubscription>> GetAllVendorSubscriptions();
        Task<MasterSubscription> GetByName(string name);
    }

    public class MasterSubscriptionRepository : Repository<MasterSubscription>, IMasterSubscriptionRepository
    {
        public MasterSubscriptionRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }
        public async Task<List<MasterSubscription>> GetAllVendorSubscriptions()
        {
            List<Expression<Func<MasterSubscription, bool>>> filterConditions = new List<Expression<Func<MasterSubscription, bool>>>();
            Expression<Func<MasterSubscription, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterSubscription>(a => a.IsActive, OperationExpression.Equals,
                    true));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterSubscription, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            return await this.GetManyAsync(filters);
        }
        public async Task<MasterSubscription> GetByName(string name)
        {
            List<Expression<Func<MasterSubscription, bool>>> filterConditions = new List<Expression<Func<MasterSubscription, bool>>>();
            Expression<Func<MasterSubscription, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterSubscription>(a => a.Name, OperationExpression.Equals,name));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterSubscription, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            return await this.GetOneAsync(filters);
        }
    }
}
