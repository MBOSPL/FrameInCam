using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Lov;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Master.Lov
{
    public interface IMasterLovRepository : IRepository<MasterLov>
    {
        Task<List<MasterLov>> GetByType(string p_lovType);
    }

    public class MasterLovRepository : Repository<MasterLov>, IMasterLovRepository
    {
        public MasterLovRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {
        }

        public async Task<List<MasterLov>> GetByType(string p_lovType)
        {
            Expression<Func<MasterLov, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<MasterLov>(a => a.Type, OperationExpression.Equals, p_lovType);

            return await this.GetManyAsync(filters);
        }
    }
}