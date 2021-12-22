using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains;
using FrameIncam.Domains.Common;
using FrameIncam.Domains.Common.Vendor.Search;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Models.Transaction;
using FrameIncam.Domains.Repositories.Master.Vendor;
using FrameIncam.Domains.Repositories.Transaction;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using FrameIncam.Domains.Common.Vendor;
using IO = System.IO;
using Microsoft.Extensions.Options;
using FrameIncam.Domains.Models.Master.Customer;
using FrameIncam.Domains.Repositories.Master.Customer;
using FrameIncam.Domains.Models.Config;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace FrameIncam.WebApi.Controllers.Master.Customer
{
    [Route("api/master/customer")]
    public class MasterCustomerController : FrameIncamApiController<MasterCustomer, IMasterCustomerRepository>
    {
        private readonly IHostingEnvironment m_hostingEnvironment;
        private readonly UserManager<ConfigUser> _userManager;
        public MasterCustomerController(IHostingEnvironment p_hostingEnvironment, UserManager<ConfigUser> userManager)
        {
            m_hostingEnvironment = p_hostingEnvironment;
            _userManager = userManager;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpGet("get-profile")]
        public async Task<MasterCustomer> GetProfile()
        {
            MasterCustomer profile = null;

            if (!string.IsNullOrEmpty(this.SecurityContext.GetUsername()))
            {
                profile = await this.Repository.GetByParams(this.SecurityContext.GetEmail(),null);
            }
            return profile;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpPost("update-profile")]
        public async Task<FincamApiActionResult<bool>> UpdateProfile([FromBody] MasterCustomer p_profile)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            try
            {
                var Password = p_profile.Password;
                await this.Repository.UpdateOneAsync(p_profile);
                ConfigUser user = this.Provider.GetService<ConfigUser>();

                var _user = await _userManager.FindByNameAsync(SecurityContext.GetUsername());

                var _token = await _userManager.GeneratePasswordResetTokenAsync(_user);

                var _result = await _userManager.ResetPasswordAsync(_user, _token, Password);

                if (_result.Succeeded)
                {
                    result.Result = true;
                }
                else
                    result.Result = false;
            }
            catch (Exception ex)
            {
                result.ErrorMsgs.Add("Vendor Updation Failed! " + ex.Message);
            }
            return result;
        }
    }
}
