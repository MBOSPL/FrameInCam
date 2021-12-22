using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Repositories.Master.Vendor
{
    public interface IMasterVendorTypeRepository : IRepository<MasterVendorType>
    {
    }

    public class MasterVendorTypeRepository : Repository<MasterVendorType>, IMasterVendorTypeRepository
    {
        public MasterVendorTypeRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }
    }
}
