using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Geo;
using FrameIncam.Domains.Models.Master.Vendor;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Master.Vendor
{
    public interface IMasterGeoRepository : IRepository<MasterGeo>
    {
        Task<List<MasterGeo>> GetByParams(int p_levelId,int? p_parentId);
        Task<List<MasterGeo>> GetOperationalCityList();
        Task<List<MasterGeo>> GetOperationalCityListForFreeLancer();
        Task<MasterGeo> GetByName(string p_name, int? p_levelId);
    }

    public class MasterGeoRepository : Repository<MasterGeo>, IMasterGeoRepository
    {
        public MasterGeoRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {
        }

        public async Task<List<MasterGeo>> GetByParams(int p_levelId, int? p_parentId)
        {
            List<Expression<Func<MasterGeo, bool>>> filterConditions = new List<Expression<Func<MasterGeo, bool>>>();
            Expression<Func<MasterGeo, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterGeo>(a => a.GeoLevel, OperationExpression.Equals, p_levelId));

            if (p_parentId.HasValue)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterGeo>(a => a.GeoHead, OperationExpression.Equals, p_parentId.Value));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterGeo, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetManyAsync(filters);
        }

        public async Task<List<MasterGeo>> GetOperationalCityList()
        {
            List<int> operationalCityIds = DataContext.MasterVendorAddress.Select(vAddress => vAddress.CityGeoId).Distinct().ToList();

            List<Expression<Func<MasterGeo, bool>>> filterConditions = new List<Expression<Func<MasterGeo, bool>>>();
            Expression<Func<MasterGeo, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterGeo>(a => a.GeoLevel, OperationExpression.Equals, 3));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterGeo, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            IQueryable<MasterGeo> query = (from geoCity in this.GetQueryable(filters)
                                           where operationalCityIds.Any(cityId => cityId == geoCity.id)
                                           select geoCity);

            return await query.ToListAsync();
        }

        public async Task<MasterGeo> GetByName(string p_name, int? p_levelId)
        {
            List<Expression<Func<MasterGeo, bool>>> filterConditions = new List<Expression<Func<MasterGeo, bool>>>();
            Expression<Func<MasterGeo, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterGeo>(a => a.GeoName, OperationExpression.Equals, p_name));

            if (p_levelId.HasValue)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterGeo>(a => a.GeoLevel, OperationExpression.Equals, p_levelId.Value));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterGeo, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetOneAsync(filters);
        }

        public async Task<List<MasterGeo>> GetOperationalCityListForFreeLancer()
        {
            List<int> operationalCityIds = DataContext.MasterFreeLancerAddress.Select(vAddress => vAddress.CityGeoId).Distinct().ToList();

            List<Expression<Func<MasterGeo, bool>>> filterConditions = new List<Expression<Func<MasterGeo, bool>>>();
            Expression<Func<MasterGeo, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterGeo>(a => a.GeoLevel, OperationExpression.Equals, 3));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterGeo, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            IQueryable<MasterGeo> query = (from geoCity in this.GetQueryable(filters)
                                           where operationalCityIds.Any(cityId => cityId == geoCity.id)
                                           select geoCity);

            return await query.ToListAsync();
        }
    }
}