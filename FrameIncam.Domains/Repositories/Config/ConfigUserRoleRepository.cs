using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Config;
using FrameIncam.Domains.Models.Master.Vendor;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using System.Linq.Expressions;
using FrameIncam.Domains.Extensions;

namespace FrameIncam.Domains.Repositories.Config
{
    public interface IConfigUserRoleRepository : IRepository<ConfigUserRoles>
    {
        Task<ConfigUserRoles> GetByUserId(int p_userId);
        Task<ConfigRole> GetRoleByUserId(int p_userId);
        Task MapVendor(int p_vendorId);
        Task MapCustomer(int p_customerId);
        Task MapFreeLancer(int p_freeLancerId);
    }

    public class ConfigUserRoleRepository : Repository<ConfigUserRoles>, IConfigUserRoleRepository
    {
        public ConfigUserRoleRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        public async Task<ConfigUserRoles> GetByUserId(int p_userId)
        {
            Expression<Func<ConfigUserRoles, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<ConfigUserRoles>(a => a.UserId, OperationExpression.Equals, p_userId);

            return await this.GetOneAsync(filters);
        }

        public async Task<ConfigRole> GetRoleByUserId(int p_userId)
        {
            ConfigUserRoles userRoles = await GetByUserId(p_userId);

            if (userRoles == null)
                return default;

            IConfigRoleRepository roleRepo = Provider.GetService<IConfigRoleRepository>();
            return await roleRepo.GetByIdAsync(userRoles.RoleId);
        }

        public async Task MapVendor(int p_vendorId)
        {
            ConfigUserRoles userRoles = await GetByUserId(p_vendorId);
            if (userRoles == null)
            {
                IConfigRoleRepository roleRepo = Provider.GetService<IConfigRoleRepository>();
                ConfigRole role = await roleRepo.GetByParamsAsync("Vendor", "", true);

                if (role != null)
                {
                    userRoles = new ConfigUserRoles()
                    {
                        RoleId = role.id,
                        UserId = p_vendorId
                    };

                    await InsertOneAsync(userRoles);
                }
            }
        }

        public async Task MapCustomer(int p_customerId)
        {
            ConfigUserRoles userRoles = await GetByUserId(p_customerId);
            if (userRoles == null)
            {
                IConfigRoleRepository roleRepo = Provider.GetService<IConfigRoleRepository>();
                ConfigRole role = await roleRepo.GetByParamsAsync("Customer", "", true);

                if (role != null)
                {
                    userRoles = new ConfigUserRoles()
                    {
                        RoleId = role.id,
                        UserId = p_customerId
                    };

                    await InsertOneAsync(userRoles);
                }
            }
        }

        public async Task MapFreeLancer(int p_freeLancerId)
        {
            ConfigUserRoles userRoles = await GetByUserId(p_freeLancerId);
            if (userRoles == null)
            {
                IConfigRoleRepository roleRepo = Provider.GetService<IConfigRoleRepository>();
                ConfigRole role = await roleRepo.GetByParamsAsync("SecondShooter", "", true);

                if (role != null)
                {
                    userRoles = new ConfigUserRoles()
                    {
                        RoleId = role.id,
                        UserId = p_freeLancerId
                    };

                    await InsertOneAsync(userRoles);
                }
            }
        }
    }
}