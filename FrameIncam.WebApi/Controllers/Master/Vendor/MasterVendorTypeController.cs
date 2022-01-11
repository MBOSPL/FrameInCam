using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Repositories.Master.Vendor;
using Microsoft.AspNetCore.Mvc;

namespace FrameIncam.WebApi.Controllers.Master.Vendor
{
    [Route("api/master/vendor-type")]
    public class MasterVendorTypeController : FrameIncamApiController<MasterVendorType, IMasterVendorTypeRepository>
    {

        [HttpGet("get-all")]
        public async override Task<List<MasterVendorType>> GetAll([FromQuery(Name = "init")] bool p_init = true)
        {
            return await this.Repository.GetAllVendorTypes();
        }
    }
}