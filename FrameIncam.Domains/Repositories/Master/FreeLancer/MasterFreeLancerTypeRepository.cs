using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.FreeLancer;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Repositories.Master.FreeLancer
{
    public interface IMasterFreeLancerTypeRepository : IRepository<MasterFreeLancerType>
    {
    }

    public class MasterFreeLancerTypeRepository : Repository<MasterFreeLancerType>, IMasterFreeLancerTypeRepository
    {
        public MasterFreeLancerTypeRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }
    }
}
