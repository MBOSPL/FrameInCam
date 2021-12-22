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
    public interface IMasterFreeLancerPackageRepository : IRepository<MasterFreeLancerPackage>
    {
        Task<List<MasterFreeLancerPackage>> GetByFreeLancerPackageAsync(int p_freelancerId);
    }

    public class MasterFreeLancerPackageRepository : Repository<MasterFreeLancerPackage>, IMasterFreeLancerPackageRepository
    {
        public MasterFreeLancerPackageRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }
        public async Task<List<MasterFreeLancerPackage>> GetByFreeLancerPackageAsync(int p_freelancerId)
        {
            Expression<Func<MasterFreeLancerPackage, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancerPackage>(a => a.FreeLancerId, OperationExpression.Equals, p_freelancerId);

            return await this.GetManyAsync(filters);
        }
    }
}
