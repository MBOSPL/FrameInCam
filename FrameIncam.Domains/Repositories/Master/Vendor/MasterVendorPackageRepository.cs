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
    public interface IMasterVendorPackageRepository : IRepository<MasterVendorPackage>
    {
        Task<List<MasterVendorPackage>> GetByVendorPackageAsync(int p_vendorId);
    }

    public class MasterVendorPackageRepository : Repository<MasterVendorPackage>, IMasterVendorPackageRepository
    {
        public MasterVendorPackageRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }
        public async Task<List<MasterVendorPackage>> GetByVendorPackageAsync(int p_vendorId)
        {
            Expression<Func<MasterVendorPackage, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendorPackage>(a => a.VendorId, OperationExpression.Equals, p_vendorId);

            return await this.GetManyAsync(filters);
        }
    }
}
