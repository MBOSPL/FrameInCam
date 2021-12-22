using System;
using System.Collections.Generic;
using IO = System.IO;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains.Common;
using FrameIncam.Domains.Common.Projects;
using FrameIncam.Domains.Models.Transaction;
using FrameIncam.Domains.Repositories.Transaction;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Diagnostics;
using FrameIncam.Domains.Repositories.Master.Vendor;
using FrameIncam.Domains.Models.Master.Geo;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Repositories.Master.Customer;
using FrameIncam.Domains.Models.Master.Customer;
using Microsoft.AspNetCore.Identity.UI.Pages.Internal.Account.Manage;
using System.Configuration;
using Microsoft.AspNetCore.Hosting;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;
using FrameIncam.WebApi.Views.Emails.ProjectCreated;
using Microsoft.AspNetCore.Identity;
using FrameIncam.Domains.Models.Config;
using FrameIncam.WebApi.Services;
using FrameIncam.Domains.Repositories.Master.FreeLancer;
using FrameIncam.Domains.Models.Master.FreeLancer;
using FrameIncam.WebApi.Views.Emails.ProjectAssigned;
using MimeKit.Utils;
using System.Security.Claims;

namespace FrameIncam.WebApi.Controllers.Transaction.Project
{
    // Have to add another filter to allow only vendor users
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
    [Route("api/transaction/project")]
    public class ProjectController : FrameIncamApiController<TrnProject, ITrnProjectRepository>
    {
        private readonly IHostingEnvironment m_hostingEnvironment;
        private readonly UserManager<ConfigUser> _userManager;
        private readonly IRazorViewToStringRenderer _razorViewToStringRenderer;
        public ProjectController(IHostingEnvironment p_hostingEnvironment,
            UserManager<ConfigUser> userManager,
            IRazorViewToStringRenderer razorViewToStringRenderer
            )
        {
            _userManager = userManager;
            m_hostingEnvironment = p_hostingEnvironment;
            _razorViewToStringRenderer = razorViewToStringRenderer;
        }

        [HttpPost("add")]
        public async Task<FincamApiActionResult<TrnProject>> Add([FromBody]TrnProject p_trnProject)
        {
            FincamApiActionResult<TrnProject> result = new FincamApiActionResult<TrnProject>();
            int? vendorId = SecurityContext.GetVendorId();
            IMasterVendorSubscriptionsRepository subRepo = this.Provider.GetService<IMasterVendorSubscriptionsRepository>();
            MasterVendorSubscriptions pActiveSubscription = await subRepo.GetActiveVendorSubscription(vendorId.Value);
            if(pActiveSubscription==null)
            {
                result.ErrorMsgs.Add("Subscription Not Found!");
                return result;
            }
            /*else if(pActiveSubscription.ValidTill<DateTime.UtcNow)
            {
                result.ErrorMsgs.Add("You Subscription Expired "+ ((DateTime)pActiveSubscription.ValidTill).ToString("dd MMMM yyyy HH:mm:ss"));
                return result;
            }*/
            if (vendorId.HasValue)
            {
                List<string> validationErrors = await IsValid(p_trnProject);
                if (validationErrors.Count == 0)
                {
                    MasterCustomer customer = null;
                    IMasterCustomerRepository customerRepo = this.Provider.GetService<IMasterCustomerRepository>();

                    if (p_trnProject.CustomerId > 0)
                        customer = await customerRepo.GetByIdAsync(p_trnProject.CustomerId);
                    else
                        customer = await customerRepo.GetByParams(p_trnProject.CustomerEmail, p_trnProject.CustomerMobileNo);

                    #region Add customer

                    if (customer == null)
                    {
                        //IMasterGeoRepository geoRepo = this.Provider.GetService<IMasterGeoRepository>();
                        //MasterGeo geoCity = await geoRepo.GetByName(p_trnProject.CustomerCity, 3);

                        customer = new MasterCustomer()
                        {
                            AddressLine1 = p_trnProject.CustomerAddress1,
                            AddressLine2 = p_trnProject.CustomerAddress2,
                            AlternateMobile = p_trnProject.CustomerAltMobileNo,
                            City = p_trnProject.CustomerCity,
                            //CityGeoId = geoCity.id,
                            Code = p_trnProject.CustomerCode,
                            CreatedBy = SecurityContext.GetUsername(),
                            CreatedDate = DateTime.UtcNow,
                            Email = p_trnProject.CustomerEmail,
                            Mobile = p_trnProject.CustomerMobileNo,
                            Name = p_trnProject.CustomerName,
                            Pincode = p_trnProject.CustomerPin//,
                            //StateGeoId = geoCity.GeoHead
                        };

                        await customerRepo.InsertOneAsync(customer);
                    }

                    #endregion

                    #region Add project
                    TrnProject trnProject = new TrnProject()
                    {
                        AdvanceAmt = p_trnProject.AdvanceAmt,
                        Batch = p_trnProject.Batch,
                        BBatch = p_trnProject.BBatch,
                        Code = p_trnProject.Code,
                        CreatedDate = DateTime.UtcNow,
                        CustomerId = customer.id,
                        Designer = p_trnProject.Designer,
                        Equipments = p_trnProject.Equipments,
                        Folder = p_trnProject.Folder,
                        GSTNo = p_trnProject.GSTNo,
                        Identifier = Guid.NewGuid().ToString(),
                        Key = (string.IsNullOrEmpty(p_trnProject.Key) ? GenerateNewRandom() : p_trnProject.Key),
                        Photographer = p_trnProject.Photographer,
                        ProjectDate = p_trnProject.ProjectDate.HasValue ? p_trnProject.ProjectDate : DateTime.UtcNow,
                        ProjectName = p_trnProject.ProjectName,
                        ProjectValue = p_trnProject.ProjectValue,
                        Status = (string.IsNullOrEmpty(p_trnProject.Status) ? "New" : p_trnProject.Status),
                        Url = p_trnProject.Url,
                        VendorId = vendorId.Value,
                        CustomerCode = p_trnProject.CustomerCode,
                        CustomerName = p_trnProject.CustomerName,
                        CustomerAddress1 = p_trnProject.CustomerAddress1,
                        CustomerAddress2 = p_trnProject.CustomerAddress2,
                        CustomerAltMobileNo = p_trnProject.CustomerAltMobileNo,
                        CustomerCity = p_trnProject.CustomerCity,
                        CustomerEmail = p_trnProject.CustomerEmail,
                        CustomerMobileNo = p_trnProject.CustomerMobileNo,
                        CustomerPin = p_trnProject.CustomerPin,
                        SubscriptionId= pActiveSubscription.id
                    };

                    await this.Repository.InsertOneAsync(trnProject);
                    pActiveSubscription.RemainingProjects--;
                    await subRepo.UpdateOneAsync(pActiveSubscription);

                    #endregion
                    result.Result = await this.Repository.GetByIdAsync(trnProject.id);
                }
                else
                    result.ErrorMsgs = validationErrors;
            }
            else
                result.ErrorMsgs.Add("Vendor is required");

            return result;
        }

        private static string GenerateNewRandom()
        {
            Random generator = new Random();
            String r = generator.Next(0, 1000000).ToString("D6");
            if (r.Distinct().Count() == 1)
            {
                r = GenerateNewRandom().ToString();
            }
            return r.PadLeft(6, '0');
        }

        [HttpPost("modify")]
        public async Task<FincamApiActionResult<bool>> Modify([FromBody]TrnProject p_trnProject)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            int? vendorId = SecurityContext.GetVendorId();

            if (vendorId.HasValue)
            {
                List<string> validationErrors = await IsValid(p_trnProject, false);
                if (validationErrors.Count == 0)
                {
                    #region Init values

                    TrnProject project = await this.Repository.GetByParams(p_trnProject.id, p_trnProject.Code);

                    project.AdvanceAmt = p_trnProject.AdvanceAmt;
                    project.Batch = p_trnProject.Batch;
                    project.BBatch = p_trnProject.BBatch;
                    project.CustomerId = p_trnProject.CustomerId;
                    project.Designer = p_trnProject.Designer;
                    project.Equipments = p_trnProject.Equipments;
                    project.Folder = p_trnProject.Folder;
                    project.GSTNo = p_trnProject.GSTNo;
                    project.Key = p_trnProject.Key;
                    project.Photographer = p_trnProject.Photographer;
                    project.ProjectDate = p_trnProject.ProjectDate;
                    project.ProjectName = p_trnProject.ProjectName;
                    project.ProjectValue = p_trnProject.ProjectValue;
                    project.Status = p_trnProject.Status;
                    project.Url = p_trnProject.Url;

                    project.CustomerCode = p_trnProject.CustomerCode;
                    project.CustomerName = p_trnProject.CustomerName;
                    project.CustomerAddress1 = p_trnProject.CustomerAddress1;
                    project.CustomerAddress2 = p_trnProject.CustomerAddress2;
                    project.CustomerAltMobileNo = p_trnProject.CustomerAltMobileNo;
                    project.CustomerCity = p_trnProject.CustomerCity;
                    project.CustomerEmail = p_trnProject.CustomerEmail;
                    project.CustomerMobileNo = p_trnProject.CustomerMobileNo;
                    project.CustomerPin = p_trnProject.CustomerPin;

                    #endregion

                    await this.Repository.UpdateOneAsync(project);
                    result.Result = true;
                }
                else
                    result.ErrorMsgs = validationErrors;
            }
            else
                result.ErrorMsgs.Add("Vendor is required");

            return result;
        }

        [AllowAnonymous]
        [HttpPost("update-status")]
        public async Task<FincamApiActionResult<bool>> UpdateStatus([FromBody]TrnProject p_trnProject)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            //int? vendorId = SecurityContext.GetVendorId();

            //if (vendorId.HasValue)
            {
                List<string> validationErrors = await IsValidStatusUpdateRequest(p_trnProject);
                if (validationErrors.Count == 0)
                {
                    TrnProject project = await this.Repository.GetByParams(p_trnProject.id, p_trnProject.Code);
                    if (project.Status != p_trnProject.Status)
                    {
                        project.Status = p_trnProject.Status;
                        await this.Repository.UpdateOneAsync(project);
                    }

                    result.Result = true;
                }
                else
                    result.ErrorMsgs = validationErrors;
            }
            //else
            //    result.ErrorMsgs.Add("Vendor is required");

            return result;
        }

        [AllowAnonymous]
        [HttpPost("approve-project/{p_projectId}")]
        public async Task<FincamApiActionResult<bool>> ApproveProject(int p_projectId)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };

            TrnProject project = new TrnProject()
            {
                id = p_projectId,
                Status = "Photos Filtered"
            };

            result = await UpdateStatus(project);

            return result;
        }
        [HttpPost("assign-project/{p_projectId}/{p_freeLancerId}")]
        public async Task<FincamApiActionResult<bool>> assignProject(int p_projectId,int p_freeLancerId)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool> { Result = false };
            TrnProject trnProject = await this.Repository.GetByIdAsync(p_projectId);
            int? vendorId = SecurityContext.GetVendorId();
            IMasterFreeLancerRepository freeLancerRepo = this.Provider.GetService<IMasterFreeLancerRepository>();
            MasterFreeLancer masterFreeLancer = await freeLancerRepo.GetByIdAsync(p_freeLancerId);
            if (trnProject!=null && masterFreeLancer!=null && vendorId == trnProject.VendorId)
            {
                trnProject.Photographer = p_freeLancerId;
                bool flag=await this.Repository.AssignProject(trnProject,masterFreeLancer);
                if(flag==true)
                {
                    result.Result = true;
                    IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();
                    string projectLink = appSettings.Value.SecondShooterClientUrl;
                    string assignedBy = this.SecurityContext.GetName();
                    var projectAssignedModel = new ProjectAssignedEmailViewModel(masterFreeLancer.Name, appSettings.Value.ClientUrl, trnProject.ProjectName, projectLink, assignedBy);
                    string body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/ProjectAssigned/ProjectAssigned.cshtml", projectAssignedModel);
                    var toAddresses = new List<string> { masterFreeLancer.Email };
                    try
                    {
                        string subject = assignedBy + " Assigned a '" + trnProject.ProjectName + "' Project to you";
                        SendEmail(toAddresses, subject, body);
                        result.Result = true;
                    }
                    catch (Exception e)
                    {
                        result.ErrorMsgs.Add("Unable To Trigger Confirmation Email! Contact Admin");
                    }
                }
                else
                {
                    result.ErrorMsgs.Add("Assigning Failed!");
                }
            }
            else
                result.ErrorMsgs.Add("Assigning Failed!");
            return result;
        }
        [AllowAnonymous]
        [HttpGet("get-by-identifier/{p_identifier}")]
        public async Task<TrnProject> GetByIdentifier(string p_identifier)
        {
            if (string.IsNullOrEmpty(p_identifier))
                return default(TrnProject);

            return await this.Repository.GetByIdentifier(p_identifier);
        }

        [AllowAnonymous]
        [HttpPost("authenticate-pin")]
        public async Task<FincamApiActionResult<bool>> ValidatePin([FromBody]TrnProject p_trnProject)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };

            if (p_trnProject.id > 0 && !string.IsNullOrEmpty(p_trnProject.Key))
            {
                TrnProject project = await this.Repository.GetByIdAsync(p_trnProject.id);

                if (project != null && project.id > 0 && project.Key == p_trnProject.Key)
                    result.Result = true;
            }

            return result;
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpGet("get-by-vendor/{projectType?}")]
        public async Task<List<TrnProject>> GetByVendor(string projectType)
        {
            int? vendorId = SecurityContext.GetVendorId();
            string userEmail = SecurityContext.GetEmail();

            ConfigUser user = await _userManager.FindByEmailAsync(userEmail);
            int? userId = user.Id;
            if (!vendorId.HasValue)
                return default(List<TrnProject>);

            return await this.Repository.GetByVendor(vendorId.Value, projectType,userId);
        }

        [HttpGet("get-by-customer")]
        public async Task<List<TrnProject>> GetByCustomer()
        {
            int? customerId = SecurityContext.GetCustomerId();

            if (!customerId.HasValue)
                return default(List<TrnProject>);

            return await this.Repository.GetByCustomer(customerId.Value);
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpGet("get-by-freelancer/{projectType?}")]
        public async Task<List<TrnProject>> GetByFreeLancer(string projectType)
        {
            //int? freelancerId = SecurityContext.GetFreeLancerId();
            string userEmail = SecurityContext.GetEmail();
            ConfigUser user = await _userManager.FindByEmailAsync(userEmail);
            int? freelancerId = user.Id; 
            if (!freelancerId.HasValue)
                return default(List<TrnProject>);

            return await this.Repository.GetByFreeLancer(freelancerId.Value, projectType);
        }
        [HttpGet("get-default-presentation/{p_projectId}")]
        public async Task<IActionResult> GetDefaultPresentation(string p_projectId)
        {
            int _id;
            string presentationPath = IO.Path.Combine(m_hostingEnvironment.WebRootPath, "images\\no-image.jpg");

            if (int.TryParse(p_projectId, out _id))
            {
                TrnProject project = await this.Repository.GetByIdAsync(_id);
                ITrnProjectFilesRepository projectFileRepo = this.Provider.GetService<ITrnProjectFilesRepository>();
                TrnProjectFiles defaultFile = await projectFileRepo.GetDefaultFile(_id);

                if (defaultFile != null)
                {
                    string projectThumbnailPath = GetProjectUploadPath(project.Identifier, true);
                    string thumbnailFilePath = IO.Path.Combine(projectThumbnailPath, defaultFile.FileName);

                    if (IO.File.Exists(thumbnailFilePath))
                        presentationPath = thumbnailFilePath;
                    else
                    {
                        string projectPath = GetProjectUploadPath(project.Identifier, false);
                        string filePath = IO.Path.Combine(projectPath, defaultFile.FileName);

                        if (IO.File.Exists(filePath))
                            presentationPath = filePath;
                    }
                }
            }

            if (!string.IsNullOrWhiteSpace(presentationPath))
                return new FileStreamResult(new IO.FileStream(presentationPath, IO.FileMode.Open, IO.FileAccess.Read, IO.FileShare.Read), "application/octet-stream");
            else
                return new NoContentResult();
        }

        private async Task<List<string>> IsValidStatusUpdateRequest(TrnProject p_trnProject)
        {
            List<string> errorMsgs = new List<string>();

            if (p_trnProject == null)
                errorMsgs.Add("Invalid data");
            else
            {
                if (p_trnProject.id == 0)
                    errorMsgs.Add("Project id/code is required");
                else
                {
                    TrnProject project = await this.Repository.GetByParams(p_trnProject.id, p_trnProject.Code);
                    if (project == null)
                        errorMsgs.Add("Invalid project id/code");
                }
                if (string.IsNullOrEmpty(p_trnProject.Status))
                    errorMsgs.Add("Status is required");
            }

            return errorMsgs;
        }
        private async Task<List<string>> IsValid(TrnProject p_trnProject, bool isNew = true)
        {
            List<string> errorMsgs = new List<string>();

            if (p_trnProject == null)
                errorMsgs.Add("Invalid data");
            else
            {
                IMasterVendorRepository vendorRepo = this.Provider.GetService<IMasterVendorRepository>();

                //if (p_trnProject.Code == 0)
                //    errorMsgs.Add("Invalid code");

                if (p_trnProject.CustomerId == 0 &&
                    (string.IsNullOrEmpty(p_trnProject.CustomerName) ||
                    string.IsNullOrEmpty(p_trnProject.CustomerMobileNo) ||
                    string.IsNullOrEmpty(p_trnProject.CustomerEmail) ||
                    string.IsNullOrEmpty(p_trnProject.CustomerCity)) //||
                                                                     //!p_trnProject.CustomerCode.HasValue ||
                                                                     //p_trnProject.CustomerCode == 0)
                    )
                    errorMsgs.Add("Invalid customer data");
                else if (p_trnProject.CustomerId == 0 && !string.IsNullOrEmpty(p_trnProject.CustomerEmail))
                {
                    MasterVendor vendor = await vendorRepo.GetByEmailAsync(p_trnProject.CustomerEmail);
                    if (vendor != null)
                        errorMsgs.Add("Email already registered as vendor");
                }

                if (p_trnProject.CustomerId > 0)
                {
                    IMasterCustomerRepository customerRepo = this.Provider.GetService<IMasterCustomerRepository>();
                    MasterCustomer customer = await customerRepo.GetByIdAsync(p_trnProject.CustomerId);
                    if (customer == null)
                        errorMsgs.Add("Invalid customer id");
                }

                //if (!string.IsNullOrEmpty(p_trnProject.CustomerCity))
                //{
                //    IMasterGeoRepository geoRepo = this.Provider.GetService<IMasterGeoRepository>();
                //    MasterGeo geoCity = await geoRepo.GetByName(p_trnProject.CustomerCity, 3);
                //    if (geoCity == null)
                //        errorMsgs.Add("Invalid customer city");
                //}


                if (p_trnProject.VendorId > 0)
                {
                    MasterVendor vendor = await vendorRepo.GetByIdAsync(p_trnProject.VendorId);
                    if (vendor == null)
                        errorMsgs.Add("Invalid vendor");
                }

                if (!isNew)
                {
                    if (p_trnProject.id == 0) // && p_trnProject.Code == 0
                        errorMsgs.Add("Project id/code is required");
                    else
                    {
                        TrnProject project = await this.Repository.GetByParams(p_trnProject.id, p_trnProject.Code);
                        if (project == null)
                            errorMsgs.Add("Invalid project id/code");
                    }
                }

                if (string.IsNullOrEmpty(p_trnProject.ProjectName))
                    errorMsgs.Add("Project name is required");
                else if (await this.Repository.IsExistAsync(p_trnProject.ProjectName, p_trnProject.id))
                    errorMsgs.Add("Project already exists");
            }

            return errorMsgs;
        }

        [HttpPost("upload-file")]
        [RequestSizeLimit(int.MaxValue)]
        [RequestFormLimits(MultipartBodyLengthLimit = int.MaxValue,
            ValueLengthLimit = int.MaxValue,
            KeyLengthLimit = int.MaxValue,
            ValueCountLimit = int.MaxValue,
            MultipartHeadersCountLimit = int.MaxValue,
            MultipartHeadersLengthLimit = int.MaxValue,
            MultipartBoundaryLengthLimit = int.MaxValue)]
        public async Task<FincamApiActionResult<bool>> UploadFile(ProjectFileUploadRequest p_projectFileUploadRequest)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };

            if (p_projectFileUploadRequest != null && (p_projectFileUploadRequest.Id.HasValue || p_projectFileUploadRequest.Code.HasValue) &&
                Request.Form.Files != null && Request.Form.Files.Count > 0 && Request.Form.Files.Sum(file => file.Length) > 0)
            {
                TrnProject project = await this.Repository.GetByParams(p_projectFileUploadRequest.Id, p_projectFileUploadRequest.Code);
                if (project != null)
                {
                    string projectUploadPath = GetProjectUploadPath(project.Identifier, p_projectFileUploadRequest.IsThumbnail);
                    ITrnProjectFilesRepository filesRepo = this.Provider.GetService<ITrnProjectFilesRepository>();
                    int errorFileCount = 0;

                    foreach (var projectFile in Request.Form.Files)
                    {
                        if (projectFile.Length > 0)
                        {
                            try
                            {
                                string projectFilePath = IO.Path.Combine(projectUploadPath, projectFile.FileName);

                                if (IO.File.Exists(projectFilePath))
                                    IO.File.Delete(projectFilePath);

                                using (IO.FileStream stream = new IO.FileStream(projectFilePath, IO.FileMode.Create))
                                {
                                    await projectFile.CopyToAsync(stream);
                                }
                                var fileType = p_projectFileUploadRequest.IsThumbnail != true ? "image" : "thumbnail";
                                TrnProjectFiles existingFile = await filesRepo.GetByParamsAsync(project.id, projectFile.FileName, fileType);
                                if (existingFile != null)
                                {
                                    if (!p_projectFileUploadRequest.IsThumbnail)
                                    {
                                        existingFile.ContentLength = projectFile.Length;
                                        existingFile.ContentType = projectFile.ContentType;
                                        existingFile.UpdatedBy = this.SecurityContext.GetUsername();
                                        existingFile.UpdatedDate = DateTime.UtcNow;

                                        await filesRepo.UpdateOneAsync(existingFile);
                                    }
                                }
                                else
                                {
                                    TrnProjectFiles trnProjectFile = new TrnProjectFiles()
                                    {
                                        ContentLength = projectFile.Length,
                                        ContentType = projectFile.ContentType,
                                        CreatedBy = this.SecurityContext.GetUsername(),
                                        CreatedDate = DateTime.UtcNow,
                                        FileName = projectFile.FileName,
                                        ProjectId = project.id,
                                        FileType = fileType
                                    };
                                    await filesRepo.InsertOneAsync(trnProjectFile);
                                }
                            }
                            catch (Exception ex)
                            {
                                errorFileCount += 1;
                            }
                        }
                    }
                    if (errorFileCount == 0)
                        result.Result = true;
                    else
                        result.ErrorMsgs.Add(string.Format("Error processing {0}/{1} files",
                            errorFileCount, Request.Form.Files.Count));
                }
                else
                    result.ErrorMsgs.Add("Invalid project");
            }
            else
                result.ErrorMsgs.Add("Invalid input");

            return result;
        }

        private string GetProjectUploadPath(string p_identifier, bool isThumbnail)
        {
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();

            if (string.IsNullOrEmpty(appSettings.Value.UploadFilesPath))
                return string.Empty;

            string projectFolderPath = IO.Path.Combine(appSettings.Value.UploadFilesPath, "Projects", p_identifier, (isThumbnail ? "Thumbnails" : ""));

            if (!IO.Directory.Exists(projectFolderPath))
                IO.Directory.CreateDirectory(projectFolderPath);

            return projectFolderPath;
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("customer/mail/{projectId}")]
        public async Task<FincamApiActionResult<bool>> MailCustomer(string projectId)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            int? VendorId = this.SecurityContext.GetVendorId();
            IMasterVendorRepository vendorRepo = this.Provider.GetService<IMasterVendorRepository>();
            var masterVendor=await vendorRepo.GetByIdAsync(VendorId);
            TrnProject trnProject = await this.Repository.GetByIdentifier(projectId); 
            if (trnProject==null)
            {
                result.ErrorMsgs.Add("Project Not Found!");
                return result;
            }
            string customerEmail = trnProject.CustomerEmail;

            if(trnProject.VendorId!= VendorId)
            {
                result.ErrorMsgs.Add("Project Not Belongs To You!");
                return result;
            }
            if (masterVendor!=null && trnProject !=null)
            {
                IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();

                var projectLink = this.getProjectLink(projectId);

                var confirmAccountModel = new ProjectCreatedEmailViewModel(trnProject.CustomerName, appSettings.Value.ClientUrl, appSettings.Value.CompanyLogoPath, projectLink,trnProject.Key, masterVendor.Name);

                string body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/ProjectCreated/ProjectCreated.cshtml", confirmAccountModel);

                var toAddresses = new List<string> { customerEmail };
                try
                {
                    string subject = masterVendor.Name + " Shared '" + trnProject.ProjectName + "' Photos with you for photo selection";
                    SendEmail(toAddresses, subject, body);
                    result.Result = true;
                }
                catch (Exception e)
                {
                    result.ErrorMsgs.Add("Unable To Trigger Confirmation Email! Contact Admin");
                }
            }
            else
            {
                result.ErrorMsgs.Add("Project Or Vendor Infomation Missed!");
            }
            return result;
        }
        private async void SendEmail(List<string> toAddresses, string subject, string body)
        {
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();

            string fromAddress = appSettings.Value.SmtpMail;

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(fromAddress, fromAddress));
            foreach (var to in toAddresses)
            {
                message.To.Add(new MailboxAddress(to, to));
            }
            message.Subject = subject;

            var builder = new BodyBuilder();
            /*var pathImage = IO.Path.Combine(m_hostingEnvironment.WebRootPath ,"images", "FrameInCamHorizontalLogo.jpeg"); 
            var image = builder.LinkedResources.Add(pathImage);
            image.ContentId = MimeUtils.GenerateMessageId();*/
            builder.HtmlBody = body;// string.Format(body, image.ContentId);
            message.Body = builder.ToMessageBody();

            var client = new SmtpClient
            {

                // For demo-purposes, accept all SSL certificates
                ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true
            };

            await client.ConnectAsync(appSettings.Value.SmtpHost, appSettings.Value.SmtpPort, false);
            //client.Connect("127.0.0.1", 25, false);
            await client.AuthenticateAsync(fromAddress, appSettings.Value.SmtpPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
        public string getProjectLink(string projectId)
        {
            string projectLink = "";
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();
            if (!string.IsNullOrEmpty(projectId) && !string.IsNullOrEmpty(appSettings.Value.ClientUrl))
            {
                Uri baseUri = new Uri(appSettings.Value.ClientUrl);
                Uri myUri = new Uri(baseUri, "/customer/project/"+projectId);
                projectLink = myUri.AbsoluteUri;
            }
            return projectLink;
        }
    }
}