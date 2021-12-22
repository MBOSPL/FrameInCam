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
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Master.Geo;
using Microsoft.AspNetCore.Identity;
using FrameIncam.Domains.Models.Config;

namespace FrameIncam.WebApi.Controllers.Master.Vendor
{
    [Route("api/master/vendor")]
    public class MasterVendorController : FrameIncamApiController<MasterVendor, IMasterVendorRepository>
    {
        private readonly IHostingEnvironment m_hostingEnvironment;
        private readonly UserManager<ConfigUser> _userManager;
        public MasterVendorController(
            IHostingEnvironment p_hostingEnvironment,
        UserManager<ConfigUser> userManager)
        {
            _userManager = userManager;
            m_hostingEnvironment = p_hostingEnvironment;

        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpGet("get-profile")]
        public async Task<VendorProfile> GetProfile()
        {
            VendorProfile profile = null;

            if (!string.IsNullOrEmpty(this.SecurityContext.GetUsername()))
            {
                MasterVendor vendor = await this.Repository.GetByEmailAsync(this.SecurityContext.GetUsername());

                if (vendor != null)
                {
                    profile = new VendorProfile();
                    profile.Vendor = vendor;

                    IMasterVendorAddressRepository addressRepo = this.Provider.GetService<IMasterVendorAddressRepository>();
                    profile.Address = await addressRepo.GetByVendorAsync(vendor.id);
                    if (profile.Address == null)
                    {
                        profile.Address = new MasterVendorAddress();
                    }
                    else
                    {
                        IMasterGeoRepository geoRepo = this.Provider.GetService<IMasterGeoRepository>();
                        MasterGeo masterGeo = (await geoRepo.GetByIdAsync(profile.Address.CityGeoId));
                        if (masterGeo != null)
                            profile.Address.Cityname = masterGeo.GeoName;
                    }

                    IMasterVendorServiceMapRepository serviceRepo = this.Provider.GetService<IMasterVendorServiceMapRepository>();
                    profile.Services = await serviceRepo.GetByVendorAsync(vendor.id);

                    IMasterVendorPackageRepository packageRepo = this.Provider.GetService<IMasterVendorPackageRepository>();
                    profile.Packages = await packageRepo.GetByVendorPackageAsync(vendor.id);

                    IMasterVendorSubscriptionsRepository vSubRepo = this.Provider.GetService<IMasterVendorSubscriptionsRepository>();
                    profile.Subscription = await vSubRepo.GetActiveSubscription(vendor.id);
                    if (profile.Subscription == null)
                    {
                        profile.Subscription = new MasterSubscription();
                    }
                    profile.ActiveSubscription = await vSubRepo.GetActiveVendorSubscription(vendor.id);
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
                        profile.ActiveSubscription = new MasterVendorSubscriptions();
                }
            }

            return profile;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpPost("update-profile")]
        public async Task<FincamApiActionResult<bool>> UpdateProfile([FromBody] VendorProfile p_profile)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            if (p_profile == null || p_profile.Vendor == null || !p_profile.Vendor.IsValid())
                BadRequest();
            try
            {
                List<String> canUpdateErrorMsgs = await CanUpdateVendor(p_profile.Vendor);
                if(canUpdateErrorMsgs.Count>0)
                {
                    result.ErrorMsgs = canUpdateErrorMsgs;
                    return result;
                }
                bool updateFlag = await this.Repository.UpdateVendor(p_profile.Vendor);
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
                    IMasterVendorAddressRepository addressRepo = this.Provider.GetService<IMasterVendorAddressRepository>();
                    if (p_profile.Address.id == 0)
                        await addressRepo.InsertOneAsync(p_profile.Address);
                    else
                        await addressRepo.UpdateOneAsync(p_profile.Address);
                }

                #endregion

                #region Service mapping

                IMasterVendorServiceMapRepository serviceMapRepo = this.Provider.GetService<IMasterVendorServiceMapRepository>();
                List<MasterVendorServiceMap> currentServiceMappings = await serviceMapRepo.GetByVendorAsync(p_profile.Vendor.id);

                List<MasterVendorServiceMap> newMappings = p_profile.Services.FindAll(serviceMap =>
                    !currentServiceMappings.Any(currentMap => currentMap.ServiceId == serviceMap.ServiceId));

                List<MasterVendorServiceMap> toRemoveServiceMappings = currentServiceMappings.FindAll(currentMap =>
                    !p_profile.Services.Any(serviceMap => currentMap.ServiceId == serviceMap.ServiceId));

                foreach (MasterVendorServiceMap newMap in newMappings)
                    await serviceMapRepo.InsertOneAsync(newMap);

                foreach (MasterVendorServiceMap toRemoveMap in toRemoveServiceMappings)
                    await serviceMapRepo.RemoveOneAsync(toRemoveMap);

                #endregion

                #region Packages

                IMasterVendorPackageRepository packageRepo = this.Provider.GetService<IMasterVendorPackageRepository>();
                List<MasterVendorPackage> vendorPackages = await packageRepo.GetByVendorPackageAsync(p_profile.Vendor.id);

                List<MasterVendorPackage> newPackages = p_profile.Packages.FindAll(package => package.id == 0);

                List<MasterVendorPackage> toRemovePackages = vendorPackages.FindAll(package =>
                    !p_profile.Packages.Any(cPackage => package.id == cPackage.id));

                List<MasterVendorPackage> toUpdatePackages = vendorPackages.FindAll(package =>
                    p_profile.Packages.Any(cPackage => package.id == cPackage.id));

                foreach (MasterVendorPackage package in newPackages)
                {
                    package.CreatedBy = this.SecurityContext.GetUsername();
                    package.CreatedDate = DateTime.UtcNow;
                    await packageRepo.InsertOneAsync(package);
                }

                foreach (MasterVendorPackage toRemovePackage in toRemovePackages)
                    await packageRepo.RemoveOneAsync(toRemovePackage);

                foreach (MasterVendorPackage toUpdatePackage in toUpdatePackages)
                {
                    MasterVendorPackage package = p_profile.Packages.Find(p => p.id == toUpdatePackage.id);

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
                result.ErrorMsgs.Add("Vendor Updation Failed! " + ex.Message);
            }
            return result;
        }

        [HttpPost("query-vendor")]
        public async Task<PaginationResults<VendorSearchResult>> QueryVendor([FromBody] VendorSearchQuery p_vendorSearchQuery)
        {
            if (p_vendorSearchQuery == null)
                return default;
            var page = 1;// Int32.Parse(Request.Query["page"]);
            return await this.Repository.Query(p_vendorSearchQuery, page);
        }
        private async Task<List<string>> CanUpdateVendor(MasterVendor p_vendor)
        {
            List<string> ErrorMsgs = new List<string>();

            if (p_vendor == null)
                ErrorMsgs.Add("Invalid data");
            else
            {
                if (string.IsNullOrEmpty(p_vendor.Mobile))
                    ErrorMsgs.Add("Mobile is required");
                else
                {
                    IMasterVendorRepository vendorRepo = this.Provider.GetService<IMasterVendorRepository>();
                    MasterVendor vendor = await vendorRepo.GetByParams(p_vendorEmail: "", p_vendorMobileNo: p_vendor.Mobile);

                    if (vendor != null && vendor.Email != p_vendor.Email)
                        ErrorMsgs.Add("Mobile already exists");
                }
            }

            return ErrorMsgs;
        }
        [HttpGet("get-vendor-detail/{p_vendorId}/{p_customerId?}")]
        public async Task<VendorDetailSearchResult> GetVendorDetail(int p_vendorId, int? p_customerId)
        {
            if (p_vendorId == 0)
                return default(VendorDetailSearchResult);

            VendorDetailSearchResult detail = new VendorDetailSearchResult();
            detail.Id = p_vendorId;
            detail.Vendor = await this.Repository.GetByIdAsync(p_vendorId);

            IMasterVendorPackageRepository packRepo = this.Provider.GetService<IMasterVendorPackageRepository>();
            detail.Packages = await packRepo.GetByVendorPackageAsync(p_vendorId);

            if (detail.Packages != null && detail.Packages.Count > 0)
            {
                MasterVendorPackage defaultPack = detail.Packages.FirstOrDefault();
                if (defaultPack != null)
                    detail.PricePerDay = defaultPack.PricePerDay;
            }

            IMasterVendorAddressRepository addressRepo = this.Provider.GetService<IMasterVendorAddressRepository>();
            detail.Address = await addressRepo.GetByVendorAsync(p_vendorId);

            IMasterVendorServiceMapRepository serviceMapRepo = this.Provider.GetService<IMasterVendorServiceMapRepository>();
            detail.Services = await serviceMapRepo.GetServicesByVendorAsync(p_vendorId);

            ITrnCustomerVendorSelectionRepository vendorSelectionRepo = this.Provider.GetService<ITrnCustomerVendorSelectionRepository>();
            List<TrnCustomerVendorSelection> customerVendorSelections = await vendorSelectionRepo.GetByVendorId(p_vendorId);

            detail.TotalLikes = customerVendorSelections.Select(sel => sel.CustomerId).Distinct().Count();

            if (p_customerId.HasValue)
                detail.IsShortlisted = customerVendorSelections.Any(sel => sel.CustomerId == p_customerId);

            return detail;
        }

        [HttpGet("get-default-presentation/{p_vendorId}")]
        public async Task<IActionResult> GetDefaultPresentation(int p_vendorId)
        {
            IMasterVendorFilesRepository masterVendorFilesRepo = this.Provider.GetService<IMasterVendorFilesRepository>();
            MasterVendorFiles masterVendorFile= await masterVendorFilesRepo.GetDefaultFile(p_vendorId, "photos");
            string presentationPath = IO.Path.Combine(m_hostingEnvironment.WebRootPath, "images\\no-image.jpg");

            MasterVendor masterVendor = await this.Repository.GetByIdAsync(p_vendorId);

            if (masterVendorFile!=null&&masterVendor!=null)
            {

                string folderPath = GetProjectUploadPath(masterVendor.Identifier);
                string temppresentationPath = IO.Path.Combine(folderPath, masterVendorFile.FileName);
                if (IO.File.Exists(temppresentationPath))
                    presentationPath = temppresentationPath;
            }
            return new FileStreamResult(new IO.FileStream(presentationPath, IO.FileMode.Open, IO.FileAccess.Read, IO.FileShare.Read), "application/octet-stream");
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpGet("get-shortlisted")]
        public async Task<PaginationResults<VendorSearchResult>> GetShortlistedVendors()
        {
            int? customerId = SecurityContext.GetCustomerId();

            if (!customerId.HasValue)
                return default;

            return await this.Repository.GetShortlistedVendors(customerId.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpPost("toggle-vendor-selection/{p_vendorId}")]
        public async Task ToggleVendorSelection(string p_vendorId)
        {
            int? customerId = SecurityContext.GetCustomerId();
            int _id;
            if (int.TryParse(p_vendorId, out _id) && customerId.HasValue)
                await this.Repository.ToggleVendorSelection(customerId.Value, _id);
        }
        /*[HttpGet("get-active-vendors")]
        public async Task<> getActiveVendors()
        {

        }*/
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpPost("reviews")]
        public async Task<FincamApiActionResult<bool>> storeReviews([FromBody] VendorCustomerReviewRequest customerReview)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            try
            {
                ITrnVendorCustomerReviewRepository trnCustomerRepo = this.Provider.GetService<ITrnVendorCustomerReviewRepository>();
                TrnVendorCustomerReview mCustomerReview = new TrnVendorCustomerReview
                {
                    Title = customerReview.Title,
                    VendorId = customerReview.vendor_id,
                    Body = customerReview.Body,
                    CreatedBy = customerReview.Email,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                    IsShow = false,
                    Ratings = customerReview.Ratings
                };
                await trnCustomerRepo.InsertOneAsync(mCustomerReview);
                result.Result = true;
            }
            catch (Exception e)
            {
                result.ErrorMsgs.Add("Review Creation Failed. " + e.Message);
            }
            return result;
        }
        [AllowAnonymous]
        [HttpGet("reviews/get-by-vendor/{VendorId}")]
        public async Task<PaginationResults<TrnVendorCustomerReview>> getReviewsByVendor(int? VendorId, [FromQuery]int page)
        {
            List<TrnVendorCustomerReview> trnVendorCustomerReviews = null;
            ITrnVendorCustomerReviewRepository reviewRepo = this.Provider.GetService<ITrnVendorCustomerReviewRepository>();
            page = page == null ? 1 : page;
            return await reviewRepo.GetReviewsByVendor(VendorId,page);
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpPost("reviews/{p_reviewId}/replay")]
        public async Task<FincamApiActionResult<bool>> storeReplayForReviews(int p_reviewId,[FromBody] VendorCustomerReviewReplayRequest req)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            try
            {
                ITrnVendorCustomerReviewRepository reviewRepository = this.Provider.GetService<ITrnVendorCustomerReviewRepository>();
                TrnVendorCustomerReview vendorCustomerReview = await reviewRepository.GetByIdAsync(p_reviewId);
                ITrnVendorCustomerReviewReplayRepository replayRepository = this.Provider.GetService<ITrnVendorCustomerReviewReplayRepository>();

                TrnVendorCustomerReviewReplay replay = new TrnVendorCustomerReviewReplay
                {
                    CreatedBy = SecurityContext.GetEmail(),
                    ReviewId = p_reviewId,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate=DateTime.UtcNow,
                    Body= req.Body,
                    VendorId= vendorCustomerReview.VendorId
                };
                await replayRepository.InsertOneAsync(replay);
                result.Result = true;
            }
            catch(Exception e)
            {
                result.ErrorMsgs.Add("Replay Creation Failed! " + e.Message);
            }
            return result;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpPost("get-exe-link")]
        public FincamApiActionResult<bool> getMsiLink()
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();
            result.Result = true;
            result.ErrorMsgs.Add(appSettings.Value.PhotographerMSILink);
            return result;
        }

        [HttpGet("msi/updated")]
        public VersionResult getVendorMSIUpdated()
        {
            VersionResult result = new VersionResult { };
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();
            result.VersionCode = appSettings.Value.PhotographerMSIVersionCode;
            result.DownloadLink = appSettings.Value.PhotographerMSILink;
            return result;
        }
        private string GetProjectUploadPath(string p_identifier)
        {
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();

            if (string.IsNullOrEmpty(appSettings.Value.UploadFilesPath))
                return string.Empty;

            string projectFolderPath = IO.Path.Combine(appSettings.Value.UploadFilesPath, "Profiles", p_identifier, "photos");

            return projectFolderPath;
        }
    }
}