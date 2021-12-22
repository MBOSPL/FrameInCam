using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Vendor;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Master.Vendor
{
    public interface IMasterVendorServiceMapRepository : IRepository<MasterVendorServiceMap>
    {
        Task<List<MasterVendorServiceMap>> GetByVendorAsync(int p_vendorId);
        Task<List<MasterVendorService>> GetServicesByVendorAsync(int p_vendorId);
    }

    public class MasterVendorServiceMapRepository : Repository<MasterVendorServiceMap>, IMasterVendorServiceMapRepository
    {
        public MasterVendorServiceMapRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }
        public async Task<List<MasterVendorServiceMap>> GetByVendorAsync(int p_vendorId)
        {
            Expression<Func<MasterVendorServiceMap, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorServiceMap>(a => a.VendorId, OperationExpression.Equals, p_vendorId);

            return await this.GetManyAsync(filters);
        }

        public async Task<List<MasterVendorService>> GetServicesByVendorAsync(int p_vendorId)
        {
            Expression<Func<MasterVendorServiceMap, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorServiceMap>(a => a.VendorId, OperationExpression.Equals, p_vendorId);

            IQueryable<MasterVendorServiceMap> vendorServiceQuery = this.GetQueryable(filters);

            var query = (from vService in vendorServiceQuery
                         join mService in DataContext.MasterVendorService on vService.ServiceId equals mService.id
                         select mService);

            return await query.ToListAsync();
        }
    }
}