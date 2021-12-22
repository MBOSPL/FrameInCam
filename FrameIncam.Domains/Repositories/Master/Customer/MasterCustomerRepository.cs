using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Customer;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Master.Customer
{
    public interface IMasterCustomerRepository : IRepository<MasterCustomer>
    {
        Task<MasterCustomer> GetByParams(string p_email, string p_mobileNo);
    }

    public class MasterCustomerRepository : Repository<MasterCustomer>, IMasterCustomerRepository
    {
        public MasterCustomerRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {
        }

        public async Task<MasterCustomer> GetByParams(string p_email, string p_mobileNo)
        {
            List<Expression<Func<MasterCustomer, bool>>> filterConditions = new List<Expression<Func<MasterCustomer, bool>>>();
            Expression<Func<MasterCustomer, bool>> filters = null;

            if (!string.IsNullOrEmpty(p_email))
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterCustomer>(a => a.Email, OperationExpression.Equals, p_email));

            if (!string.IsNullOrEmpty(p_mobileNo))
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterCustomer>(a => a.Mobile, OperationExpression.Equals, p_mobileNo));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterCustomer, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetOneAsync(filters);
        }
    }
}