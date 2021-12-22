using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains.Common;
using FrameIncam.Domains.Models.Master.Geo;
using FrameIncam.Domains.Repositories.Master.Vendor;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace FrameIncam.WebApi.Controllers.Master.Vendor
{
    [Route("api/master/geo")]
    public class MasterGeoController : FrameIncamApiController<MasterGeo, IMasterGeoRepository>
    {
        [HttpGet("get-by-params/{p_levelId}/{p_parentId?}")]
        public async Task<List<MasterGeo>> GetByParams(int p_levelId, int? p_parentId)
        {
            return await this.Repository.GetByParams(p_levelId, p_parentId);
        }

        [HttpGet("get-operational-city-list")]
        public async Task<List<MasterGeo>> GetOperationalCityList()
        {
            return await this.Repository.GetOperationalCityList();
        }
        [HttpGet("get-operational-city-list-for-freelancer")]
        public async Task<List<MasterGeo>> GetOperationalCityListForFreeLancer()
        {
            return await this.Repository.GetOperationalCityListForFreeLancer();
        }
    }
}