using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Master.FreeLancer;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Z.EntityFramework.Plus;
using FrameIncam.Domains.Repositories.Master.Subscription;

namespace FrameIncam.Domains.Repositories.Master.FreeLancer
{
    public interface IMasterFreeLancerSubscriptionsRepository : IRepository<MasterFreeLancerSubscriptions>
    {
        Task<MasterSubscriptionForFreeLancer> GetActiveSubscription(int p_freelancerId);
        Task<MasterFreeLancerSubscriptions> GetActiveFreeLancerSubscription(int p_freelancerId);
        Task AddSubscription(MasterFreeLancerSubscriptions p_masterFreeLancerSubscriptions);
    }

    public class MasterFreeLancerSubscriptionsRepository : Repository<MasterFreeLancerSubscriptions>, IMasterFreeLancerSubscriptionsRepository
    {
        public MasterFreeLancerSubscriptionsRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        private IQueryable<MasterFreeLancerSubscriptions> GetActiveSubsciptionQuery(int p_freelancerId)
        {
            #region Init filters

            List<Expression<Func<MasterFreeLancerSubscriptions, bool>>> filterConditions = new List<Expression<Func<MasterFreeLancerSubscriptions, bool>>>();
            Expression<Func<MasterFreeLancerSubscriptions, bool>> filters = null;

            if (p_freelancerId > 0)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancerSubscriptions>(a => a.FreeLancerId, OperationExpression.Equals,
                    p_freelancerId));

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancerSubscriptions>(a => a.ValidTill, OperationExpression.MayorEquals,
                DateTime.UtcNow));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterFreeLancerSubscriptions, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            #endregion

            return this.GetQueryable(filters,null,x=>x.ValidFrom,"desc");
        }

        public async Task<MasterSubscriptionForFreeLancer> GetActiveSubscription(int p_freelancerId)
        {
            IQueryable<MasterFreeLancerSubscriptions> freelancerSubQuery = this.GetActiveSubsciptionQuery(p_freelancerId);
            var query = (from vSub in freelancerSubQuery
                         join mSub in DataContext.MasterSubscriptionForFreeLancer on vSub.SubscriptionId equals mSub.id
                         where vSub.ValidTill > DateTime.UtcNow
                         select mSub);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<MasterFreeLancerSubscriptions> GetActiveFreeLancerSubscription(int p_freelancerId)
        {
            IQueryable<MasterFreeLancerSubscriptions> freelancerSubQuery = this.GetActiveSubsciptionQuery(p_freelancerId);
            return await freelancerSubQuery.FirstOrDefaultAsync();
        }

        public async Task AddSubscription(MasterFreeLancerSubscriptions p_masterFreeLancerSubscriptions)
        {
            if (p_masterFreeLancerSubscriptions.FreeLancerId > 0 && p_masterFreeLancerSubscriptions.SubscriptionId > 0)
            {
                var query = (from a in DataContext.MasterSubscriptionForFreeLancer
                             where a.id == p_masterFreeLancerSubscriptions.SubscriptionId
                                                        select a);

                MasterSubscriptionForFreeLancer masterSubscription = query.FirstOrDefault();

                int? total_projects = masterSubscription.ProjectCount;
                IQueryable<MasterFreeLancerSubscriptions> freelancerSubQuery = this.GetActiveSubsciptionQuery(p_masterFreeLancerSubscriptions.FreeLancerId);
                MasterFreeLancerSubscriptions masterFreeLancerSubscriptions = freelancerSubQuery.FirstOrDefault();
                if(masterFreeLancerSubscriptions!=null)
                {
                    if(masterFreeLancerSubscriptions.RemainingProjects.HasValue)
                        total_projects += masterFreeLancerSubscriptions.RemainingProjects;
                }
                int? remaining_projects = total_projects;
                //make existing subscription as inactive
                await freelancerSubQuery.UpdateFromQueryAsync(x => new MasterFreeLancerSubscriptions() { IsActive = false });
                p_masterFreeLancerSubscriptions.TotalProjects = total_projects;
                p_masterFreeLancerSubscriptions.RemainingProjects = remaining_projects;
                p_masterFreeLancerSubscriptions.ValidFrom = DateTime.UtcNow;
                await this.InsertOneAsync(p_masterFreeLancerSubscriptions);
            }
        }
    }
}
