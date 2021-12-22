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
    public interface IMasterVendorAddressRepository : IRepository<MasterVendorAddress>
    {
        Task<MasterVendorAddress> GetByVendorAsync(int p_vendorId);
    }

    public class MasterVendorAddressRepository : Repository<MasterVendorAddress>, IMasterVendorAddressRepository
    {
        public MasterVendorAddressRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {
        }

        public async Task<MasterVendorAddress> GetByVendorAsync(int p_vendorId)
        {
            Expression<Func<MasterVendorAddress, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorAddress>(a => a.VendorId, OperationExpression.Equals, p_vendorId);

            return await this.GetOneAsync(filters);
        }
    }
}