using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Subscription;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Master.Subscription
{
    public interface IMasterSubscriptionForFreeLancerRepository : IRepository<MasterSubscriptionForFreeLancer>
    {
    }

    public class MasterSubscriptionForFreeLancerRepository : Repository<MasterSubscriptionForFreeLancer>, IMasterSubscriptionForFreeLancerRepository
    {
        public MasterSubscriptionForFreeLancerRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }
    }
}
