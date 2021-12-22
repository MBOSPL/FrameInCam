using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains.Common;
using FrameIncam.Domains.Models.Master.Geo;
using FrameIncam.Domains.Models.Master.Lov;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Repositories.Master.Lov;
using FrameIncam.Domains.Repositories.Master.Vendor;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace FrameIncam.WebApi.Controllers.Master.Vendor
{
    [Route("api/master/lov")]
    public class MasterLovController : FrameIncamApiController<MasterLov, IMasterLovRepository>
    {
        [HttpGet("get-by-type/{p_lovType}")]
        public async Task<List<MasterLov>> GetByType(string p_lovType)
        {
            return await this.Repository.GetByType(p_lovType);
        }
    }
}