using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.FreeLancer;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Master.FreeLancer
{
    public interface IMasterFreeLancerAddressRepository : IRepository<MasterFreeLancerAddress>
    {
        Task<MasterFreeLancerAddress> GetByFreeLancerAsync(int p_freelancerId);
    }

    public class MasterFreeLancerAddressRepository : Repository<MasterFreeLancerAddress>, IMasterFreeLancerAddressRepository
    {
        public MasterFreeLancerAddressRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {
        }

        public async Task<MasterFreeLancerAddress> GetByFreeLancerAsync(int p_freelancerId)
        {
            Expression<Func<MasterFreeLancerAddress, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancerAddress>(a => a.FreeLancerId, OperationExpression.Equals, p_freelancerId);

            return await this.GetOneAsync(filters);
        }
    }
}