using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Repositories.Master.Vendor;
using Microsoft.AspNetCore.Mvc;

namespace FrameIncam.WebApi.Controllers.Master.Vendor
{
    [Route("api/master/freelancer-package")]
    public class MasterFreeLancerPackageController : FrameIncamApiController<MasterVendorPackage, IMasterVendorPackageRepository>
    {
        
    }
}