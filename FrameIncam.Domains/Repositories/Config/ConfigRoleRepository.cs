using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Config;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Config
{
    public interface IConfigRoleRepository : IRepository<ConfigRole>
    {
        Task<ConfigRole> GetByParamsAsync(string p_name = "", string p_type = "", bool p_ensure = false);
    }

    public class ConfigRoleRepository : Repository<ConfigRole>, IConfigRoleRepository
    {
        public ConfigRoleRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        public async Task<ConfigRole> GetByParamsAsync(string p_name = "", string p_type = "", bool p_ensure = false)
        {
            List<Expression<Func<ConfigRole, bool>>> filterConditions = new List<Expression<Func<ConfigRole, bool>>>();
            Expression<Func<ConfigRole, bool>> filters = null;

            if (!string.IsNullOrEmpty(p_name))
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<ConfigRole>(r => r.Name,
                    OperationExpression.Equals, p_name));

            if (!string.IsNullOrEmpty(p_type))
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<ConfigRole>(r => r.Type,
                    OperationExpression.Equals, p_type));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<ConfigRole, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            ConfigRole role = await GetOneAsync(filters);

            if(role == null && p_ensure)
            {
                role = new ConfigRole()
                {
                    Name = p_name,
                    Type = p_type,
                    CreatedDate = DateTime.UtcNow,
                    Isactive = 1
                };

                await InsertOneAsync(role);
                return await GetByIdAsync(role.id);
            }

            return role;
        }
    }
}