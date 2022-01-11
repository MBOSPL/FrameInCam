using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using FrameIncam.Domains.Extensions;

namespace FrameIncam.Domains.Repositories.Master.Vendor
{
    public interface IMasterVendorTypeRepository : IRepository<MasterVendorType>
    {
        Task<List<MasterVendorType>> GetAllVendorTypes();
    }

    public class MasterVendorTypeRepository : Repository<MasterVendorType>, IMasterVendorTypeRepository
    {
        public MasterVendorTypeRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        public async Task<List<MasterVendorType>> GetAllVendorTypes()
        {
            List<Expression<Func<MasterVendorType, bool>>> filterConditions = new List<Expression<Func<MasterVendorType, bool>>>();
            Expression<Func<MasterVendorType, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorType>(a => a.Isactive, OperationExpression.Equals,true));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendorType, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            return await this.GetManyAsync(filters);
        }
    }
}
