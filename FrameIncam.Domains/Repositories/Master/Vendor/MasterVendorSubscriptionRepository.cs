using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Z.EntityFramework.Plus;
using FrameIncam.Domains.Repositories.Master.Subscription;

namespace FrameIncam.Domains.Repositories.Master.Vendor
{
    public interface IMasterVendorSubscriptionsRepository : IRepository<MasterVendorSubscriptions>
    {
        Task<MasterSubscription> GetActiveSubscription(int p_vendorId);
        Task<MasterVendorSubscriptions> GetActiveVendorSubscription(int p_vendorId);
        Task AddSubscription(MasterVendorSubscriptions p_masterVendorSubscriptions);
    }

    public class MasterVendorSubscriptionsRepository : Repository<MasterVendorSubscriptions>, IMasterVendorSubscriptionsRepository
    {
        public MasterVendorSubscriptionsRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        private IQueryable<MasterVendorSubscriptions> GetActiveSubsciptionQuery(int p_vendorId)
        {
            #region Init filters

            List<Expression<Func<MasterVendorSubscriptions, bool>>> filterConditions = new List<Expression<Func<MasterVendorSubscriptions, bool>>>();
            Expression<Func<MasterVendorSubscriptions, bool>> filters = null;

            if (p_vendorId > 0)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorSubscriptions>(a => a.VendorId, OperationExpression.Equals,
                    p_vendorId));

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorSubscriptions>(a => a.ValidTill, OperationExpression.MayorEquals,
                DateTime.UtcNow));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendorSubscriptions, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            #endregion

            return this.GetQueryable(filters,null,x=>x.ValidFrom,"desc");
        }

        public async Task<MasterSubscription> GetActiveSubscription(int p_vendorId)
        {
            IQueryable<MasterVendorSubscriptions> vendorSubQuery = this.GetActiveSubsciptionQuery(p_vendorId);
            var query = (from vSub in vendorSubQuery
                         join mSub in DataContext.MasterSubscription on vSub.SubscriptionId equals mSub.id
                         where vSub.ValidTill > DateTime.UtcNow
                         select mSub);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<MasterVendorSubscriptions> GetActiveVendorSubscription(int p_vendorId)
        {
            IQueryable<MasterVendorSubscriptions> vendorSubQuery = this.GetActiveSubsciptionQuery(p_vendorId);
            return await vendorSubQuery.FirstOrDefaultAsync();
        }

        public async Task AddSubscription(MasterVendorSubscriptions p_masterVendorSubscriptions)
        {
            if (p_masterVendorSubscriptions.VendorId > 0 && p_masterVendorSubscriptions.SubscriptionId > 0)
            {
                var query = (from a in DataContext.MasterSubscription
                                                        where a.id == p_masterVendorSubscriptions.SubscriptionId
                                                        select a);

                MasterSubscription masterSubscription = query.FirstOrDefault();

                int? total_projects = masterSubscription.ProjectCount;
                IQueryable<MasterVendorSubscriptions> vendorSubQuery = this.GetActiveSubsciptionQuery(p_masterVendorSubscriptions.VendorId);
                MasterVendorSubscriptions masterVendorSubscriptions = vendorSubQuery.FirstOrDefault();
                if(masterVendorSubscriptions!=null)
                {
                    if(masterVendorSubscriptions.RemainingProjects.HasValue)
                        total_projects += masterVendorSubscriptions.RemainingProjects;
                }
                int? remaining_projects = total_projects;
                //make existing subscription as inactive
                await vendorSubQuery.UpdateFromQueryAsync(x => new MasterVendorSubscriptions() { IsActive = false });
                p_masterVendorSubscriptions.TotalProjects = total_projects;
                p_masterVendorSubscriptions.RemainingProjects = remaining_projects;
                p_masterVendorSubscriptions.ValidFrom = DateTime.UtcNow;
                await this.InsertOneAsync(p_masterVendorSubscriptions);
            }
        }
    }
}
