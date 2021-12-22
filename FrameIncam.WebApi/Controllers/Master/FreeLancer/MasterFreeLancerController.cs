using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains;
using FrameIncam.Domains.Common;
using FrameIncam.Domains.Common.FreeLancer.Search;
using FrameIncam.Domains.Models.Master.FreeLancer;
using FrameIncam.Domains.Models.Master.FreeLancer;
using FrameIncam.Domains.Models.Master.Geo;
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Transaction;
using FrameIncam.Domains.Repositories.Master.FreeLancer;
using FrameIncam.Domains.Repositories.Master.FreeLancer;
using FrameIncam.Domains.Repositories.Master.Vendor;
using FrameIncam.Domains.Repositories.Transaction;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using IO = System.IO;

namespace FrameIncam.WebApi.Controllers.Master.FreeLancer
{
    [Route("api/master/freelancer")]
    public class MasterFreeLancerController : FrameIncamApiController<MasterFreeLancer, IMasterFreeLancerRepository>
    {
        private readonly IHostingEnvironment m_hostingEnvironment;
        public MasterFreeLancerController(IHostingEnvironment p_hostingEnvironment)
        {
            m_hostingEnvironment = p_hostingEnvironment;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpGet("get-profile")]
        public async Task<FreeLancerProfile> GetProfile()
        {
            FreeLancerProfile profile = null;

            if (!string.IsNullOrEmpty(this.SecurityContext.GetUsername()))
            {
                MasterFreeLancer freelancer = await this.Repository.GetByEmailAsync(this.SecurityContext.GetUsername());

                if (freelancer != null)
                {
                    profile = new FreeLancerProfile();
                    profile.FreeLancer = freelancer;

                    IMasterFreeLancerAddressRepository addressRepo = this.Provider.GetService<IMasterFreeLancerAddressRepository>();
                    profile.Address = await addressRepo.GetByFreeLancerAsync(freelancer.id);
                    if (profile.Address == null)
                    {
                        profile.Address = new MasterFreeLancerAddress();
                    }
                    else
                    {
                        IMasterGeoRepository geoRepo = this.Provider.GetService<IMasterGeoRepository>();
                        MasterGeo masterGeo = (await geoRepo.GetByIdAsync(profile.Address.CityGeoId));
                        if (masterGeo != null)
                            profile.Address.Cityname = masterGeo.GeoName;
                    }
                    /*IMasterFreeLancerServiceMapRepository serviceRepo = this.Provider.GetService<IMasterFreeLancerServiceMapRepository>();
                    profile.Services = await serviceRepo.GetByFreeLancerAsync(freelancer.id);*/

                    IMasterFreeLancerPackageRepository packageRepo = this.Provider.GetService<IMasterFreeLancerPackageRepository>();
                    profile.Packages = await packageRepo.GetByFreeLancerPackageAsync(freelancer.id);

                    IMasterFreeLancerSubscriptionsRepository vSubRepo = this.Provider.GetService<IMasterFreeLancerSubscriptionsRepository>();
                    profile.Subscription = await vSubRepo.GetActiveSubscription(freelancer.id);
                    if (profile.Subscription == null)
                    {
                        profile.Subscription = new MasterSubscriptionForFreeLancer();
                    }
                    profile.ActiveSubscription = await vSubRepo.GetActiveFreeLancerSubscription(freelancer.id);
                    if (profile.ActiveSubscription != null)
                    {
                        if (profile.ActiveSubscription.ValidTill != null)
                        {
                            string humanreadable = "";
                            try
                            {
                                var valid_date = profile.ActiveSubscription.ValidTill.Value.ToLocalTime();
                                humanreadable = valid_date.ToString("dd-MM-yyyy @hh:mm tt");
                            }
                            catch (Exception e)
                            {
                                humanreadable = "";
                            }
                            profile.ActiveSubscription.ValidTillIST = humanreadable;
                        }
                    }
                    else
                        profile.ActiveSubscription = new MasterFreeLancerSubscriptions();
                }
            }

            return profile;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpPost("update-profile")]
        public async Task<FincamApiActionResult<bool>> UpdateProfile([FromBody] FreeLancerProfile p_profile)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            if (p_profile == null || p_profile.FreeLancer == null || !p_profile.FreeLancer.IsValid())
                BadRequest();
            try
            {
                //await this.Repository.UpdateOneAsync(p_profile.FreeLancer);
                bool updateFlag = await this.Repository.UpdateFreeLancer(p_profile.FreeLancer);
                /*                    GetByIdAsync(p_profile.Vendor.id);
                                masterVendor.*/
                //await this.Repository.UpdateOneAsync(p_profile.Vendor);
                if (updateFlag == false)
                {
                    result.ErrorMsgs.Add("Vendor Updation Failed");
                    return result;
                }
                #region Address

                if (p_profile.Address != null && p_profile.Address.IsValid())
                {
                    IMasterFreeLancerAddressRepository addressRepo = this.Provider.GetService<IMasterFreeLancerAddressRepository>();
                    if (p_profile.Address.id == 0)
                        await addressRepo.InsertOneAsync(p_profile.Address);
                    else
                        await addressRepo.UpdateOneAsync(p_profile.Address);
                }

                #endregion

/*                #region Service mapping

                IMasterFreeLancerServiceMapRepository serviceMapRepo = this.Provider.GetService<IMasterFreeLancerServiceMapRepository>();
                List<MasterFreeLancerServiceMap> currentServiceMappings = await serviceMapRepo.GetByFreeLancerAsync(p_profile.FreeLancer.id);

                List<MasterFreeLancerServiceMap> newMappings = p_profile.Services.FindAll(serviceMap =>
                    !currentServiceMappings.Any(currentMap => currentMap.ServiceId == serviceMap.ServiceId));

                List<MasterFreeLancerServiceMap> toRemoveServiceMappings = currentServiceMappings.FindAll(currentMap =>
                    !p_profile.Services.Any(serviceMap => currentMap.ServiceId == serviceMap.ServiceId));

                foreach (MasterFreeLancerServiceMap newMap in newMappings)
                    await serviceMapRepo.InsertOneAsync(newMap);

                foreach (MasterFreeLancerServiceMap toRemoveMap in toRemoveServiceMappings)
                    await serviceMapRepo.RemoveOneAsync(toRemoveMap);

                #endregion*/

                #region Packages

                IMasterFreeLancerPackageRepository packageRepo = this.Provider.GetService<IMasterFreeLancerPackageRepository>();
                List<MasterFreeLancerPackage> freelancerPackages = await packageRepo.GetByFreeLancerPackageAsync(p_profile.FreeLancer.id);

                List<MasterFreeLancerPackage> newPackages = p_profile.Packages.FindAll(package => package.id == 0);

                List<MasterFreeLancerPackage> toRemovePackages = freelancerPackages.FindAll(package =>
                    !p_profile.Packages.Any(cPackage => package.id == cPackage.id));

                List<MasterFreeLancerPackage> toUpdatePackages = freelancerPackages.FindAll(package =>
                    p_profile.Packages.Any(cPackage => package.id == cPackage.id));

                foreach (MasterFreeLancerPackage package in newPackages)
                {
                    package.CreatedBy = this.SecurityContext.GetUsername();
                    package.CreatedDate = DateTime.UtcNow;
                    await packageRepo.InsertOneAsync(package);
                }

                foreach (MasterFreeLancerPackage toRemovePackage in toRemovePackages)
                    await packageRepo.RemoveOneAsync(toRemovePackage);

                foreach (MasterFreeLancerPackage toUpdatePackage in toUpdatePackages)
                {
                    MasterFreeLancerPackage package = p_profile.Packages.Find(p => p.id == toUpdatePackage.id);

                    if (package != null && (package.Description != toUpdatePackage.Description || package.PricePerDay != toUpdatePackage.PricePerDay))
                    {
                        toUpdatePackage.Description = package.Description;
                        toUpdatePackage.PricePerDay = package.PricePerDay;
                        toUpdatePackage.UpdatedBy = this.SecurityContext.GetUsername();
                        toUpdatePackage.UpdatedDate = DateTime.UtcNow;

                        await packageRepo.UpdateOneAsync(toUpdatePackage);
                    }
                }

                #endregion
                result.Result = true;
            }
            catch (Exception ex)
            {
                result.ErrorMsgs.Add("Second Shooter Updation Failed! " + ex.Message);
            }
            return result;
        }

        [HttpPost("query-freelancer")]
        public async Task<PaginationResults<FreeLancerSearchResult>> QueryFreeLancer([FromBody] FreeLancerSearchQuery p_freelancerSearchQuery)
        {
            if (p_freelancerSearchQuery == null)
                return default;
            var page = 1;// Int32.Parse(Request.Query["page"]);
            return await this.Repository.Query(p_freelancerSearchQuery, page);
        }

        [HttpGet("get-freelancer-detail/{p_freelancerId}/{p_vendorId?}")]
        public async Task<FreeLancerDetailSearchResult> GetFreeLancerDetail(int p_freelancerId, int? p_vendorId)
        {
            if (p_freelancerId == 0)
                return default(FreeLancerDetailSearchResult);

            FreeLancerDetailSearchResult detail = new FreeLancerDetailSearchResult();
            detail.Id = p_freelancerId;
            detail.FreeLancer = await this.Repository.GetByIdAsync(p_freelancerId);

            IMasterFreeLancerPackageRepository packRepo = this.Provider.GetService<IMasterFreeLancerPackageRepository>();
            detail.Packages = await packRepo.GetByFreeLancerPackageAsync(p_freelancerId);

            if (detail.Packages != null && detail.Packages.Count > 0)
            {
                MasterFreeLancerPackage defaultPack = detail.Packages.FirstOrDefault();
                if (defaultPack != null)
                    detail.PricePerDay = defaultPack.PricePerDay;
            }

            IMasterFreeLancerAddressRepository addressRepo = this.Provider.GetService<IMasterFreeLancerAddressRepository>();
            detail.Address = await addressRepo.GetByFreeLancerAsync(p_freelancerId);

            /*IMasterFreeLancerServiceMapRepository serviceMapRepo = this.Provider.GetService<IMasterFreeLancerServiceMapRepository>();
            detail.Services = await serviceMapRepo.GetServicesByFreeLancerAsync(p_freelancerId);*/

            ITrnVendorFreeLancerSelectionRepository freelancerSelectionRepo = this.Provider.GetService<ITrnVendorFreeLancerSelectionRepository>();
            List<TrnVendorFreeLancerSelection> customerFreeLancerSelections = await freelancerSelectionRepo.GetByFreeLancerId(p_freelancerId);

            detail.TotalLikes = customerFreeLancerSelections.Select(sel => sel.VendorId).Distinct().Count();

            if (p_vendorId.HasValue)
                detail.IsShortlisted = customerFreeLancerSelections.Any(sel => sel.VendorId == p_vendorId);

            return detail;
        }

        [HttpGet("get-default-presentation/{p_freelancerId}")]
        public async Task<IActionResult> GetDefaultPresentation(string p_freelancerId)
        {
            string presentationPath = IO.Path.Combine(m_hostingEnvironment.WebRootPath, "images\\no-image.jpg");

            if (!string.IsNullOrWhiteSpace(presentationPath))
                return new FileStreamResult(new IO.FileStream(presentationPath, IO.FileMode.Open, IO.FileAccess.Read, IO.FileShare.Read), "application/octet-stream");
            else
                return new NoContentResult();
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpPost("toggle-freelancer-selection/{p_freelancerId}")]
        public async Task ToggleFreeLancerSelection(string p_freelancerId)
        {
            int? vendorId = SecurityContext.GetVendorId();
            int _id;
            if (int.TryParse(p_freelancerId, out _id) && vendorId.HasValue)
                await this.Repository.ToggleFreeLancerSelection(vendorId.Value, _id);
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpGet("get-shortlisted")]
        public async Task<PaginationResults<FreeLancerSearchResult>> GetShortlistedFreeLancers()
        {
            int? vendorId = SecurityContext.GetVendorId();

            if (!vendorId.HasValue)
                return default;

            return await this.Repository.GetShortlistedFreeLancers(vendorId.Value);
        }

        /*[HttpGet("get-active-freelancers")]
        public async Task<> getActiveFreeLancers()
        {

        }*/
/*      [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpPost("reviews")]
        public async Task<FincamApiActionResult<bool>> storeReviews([FromBody] TrnFreeLancerCustomerReview customerReview)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            try
            {
                TrnFreeLancerCustomerReviewRepository trnCustomerRepo = this.Provider.GetService<TrnFreeLancerCustomerReviewRepository>();
                await trnCustomerRepo.InsertOneAsync(customerReview);
                result.Result = true;
            }
            catch (Exception e)
            {
                result.ErrorMsgs.Add("Review Creation Failed. " + e.Message);
            }
            return result;
        }
        }   */
    }
}
