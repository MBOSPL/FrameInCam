using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Master.Vendor
{
    public interface IMasterVendorServiceRepository : IRepository<MasterVendorService>
    {
        Task<List<MasterVendorService>> GetByTypeAsync(int p_typeId);
    }

    public class MasterVendorServiceRepository : Repository<MasterVendorService>, IMasterVendorServiceRepository
    {
        public MasterVendorServiceRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        public async Task<List<MasterVendorService>> GetByTypeAsync(int p_typeId)
        {
            Expression<Func<MasterVendorService, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorService>(a => a.Typeid, OperationExpression.Equals, p_typeId);

            return await this.GetManyAsync(filters);
        }
    }
}