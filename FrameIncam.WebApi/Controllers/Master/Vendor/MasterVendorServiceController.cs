using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains.Common;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Repositories.Master.Vendor;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace FrameIncam.WebApi.Controllers.Master.Vendor
{
    [Route("api/master/vendor-service")]
    public class MasterVendorServiceController : FrameIncamApiController<MasterVendorService, IMasterVendorServiceRepository>
    {
    }
}