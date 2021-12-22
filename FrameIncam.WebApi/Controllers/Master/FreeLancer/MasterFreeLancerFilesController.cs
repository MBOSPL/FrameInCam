using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameIncam.Domains;
using FrameIncam.Domains.Common;
using FrameIncam.Domains.Common.FreeLancer.Search;
using FrameIncam.Domains.Models.Master.FreeLancer;
using FrameIncam.Domains.Models.Transaction;
using FrameIncam.Domains.Repositories.Master.FreeLancer;
using FrameIncam.Domains.Repositories.Transaction;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using FrameIncam.Domains.Common.FreeLancer;
using IO = System.IO;
using Microsoft.Extensions.Options;
using FrameIncam.Domains.Extensions;
using System.Linq.Expressions;

namespace FrameIncam.WebApi.Controllers.Master.FreeLancer
{
    [Route("api/master/freelancer/portfolio")]
    public class MasterFreeLancerFilesController : FrameIncamApiController<MasterFreeLancerFiles, IMasterFreeLancerFilesRepository>
    {
        private readonly IHostingEnvironment m_hostingEnvironment;
        public MasterFreeLancerFilesController(IHostingEnvironment p_hostingEnvironment)
        {
            m_hostingEnvironment = p_hostingEnvironment;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpPost("photos")]
        public async Task<FincamApiActionResult<bool>> storePortfolioPhotos([FromForm] Byte photo)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            try
            {
                if (Request.Form.Files != null && Request.Form.Files.Count > 0 && Request.Form.Files.Sum(file => file.Length) > 0)
                {
                    var FreeLancerId = SecurityContext.GetFreeLancerId();
                    IMasterFreeLancerRepository vendorRepository = this.Provider.GetService<IMasterFreeLancerRepository>();
                    MasterFreeLancer masterFreeLancer = await vendorRepository.GetByIdAsync(FreeLancerId);
                    if (masterFreeLancer != null)
                    {
                        string projectUploadPath = GetProjectUploadPath(masterFreeLancer.Identifier);
                        IMasterFreeLancerFilesRepository filesRepo = this.Provider.GetService<IMasterFreeLancerFilesRepository>();
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
                                    var fileType = "photos";
                                    //var flag = await this.Repository.ClearOldFiles(FreeLancerId,"portfolio");
                                    var flag = true;

                                    MasterFreeLancerFiles masterFreeLancerFiles = new MasterFreeLancerFiles()
                                        {
                                            ContentLength = projectFile.Length,
                                            ContentType = projectFile.ContentType,
                                            CreatedBy = this.SecurityContext.GetUsername(),
                                            CreatedDate = DateTime.UtcNow,
                                            FileName = projectFile.FileName,
                                            FreeLancerId = FreeLancerId,
                                            FileType = fileType
                                        };
                                        await filesRepo.InsertOneAsync(masterFreeLancerFiles);
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
                        result.ErrorMsgs.Add("Invalid FreeLancer");
                }
                else
                    result.ErrorMsgs.Add("Invalid input");

            }
            catch (Exception e)
            {
                result.ErrorMsgs.Add("Invalid input "+e.Message);
            }
            return result;
        }
        private string GetProjectUploadPath(string p_identifier)
        {
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();

            if (string.IsNullOrEmpty(appSettings.Value.UploadFilesPath))
                return string.Empty;

            string projectFolderPath = IO.Path.Combine(appSettings.Value.UploadFilesPath, "Profiles", p_identifier, "photos");

            if (!IO.Directory.Exists(projectFolderPath))
                IO.Directory.CreateDirectory(projectFolderPath);

            return projectFolderPath;
        }
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [AllowAnonymous]
        [HttpGet("get-photos/{p_vendorId}")]
        public async Task<List<MasterFreeLancerFiles>> getPhotos(int? p_vendorId)
        {
            var masterFreeLancerFiles=await this.Repository.GetByParamsAsync(p_vendorId, "photos");
            return masterFreeLancerFiles;
        }
        [AllowAnonymous]
        [HttpGet("get-default-presentation/{vendorId}/{p_fileId}")]
        public async Task<IActionResult> GetDefaultPresentation(int vendorId, int p_fileId)
        {
            int _id;
            string presentationPath = IO.Path.Combine(m_hostingEnvironment.WebRootPath, "images\\no-image.jpg");
            IMasterFreeLancerRepository vendorRepo = this.Provider.GetService<IMasterFreeLancerRepository>();
            MasterFreeLancer masterFreeLancer=await vendorRepo.GetByIdAsync(vendorId);
             
            MasterFreeLancerFiles defaultFile = await this.Repository.GetByIdAsync(p_fileId);

                if (defaultFile != null)
                {
                    string projectThumbnailPath = GetProjectUploadPath(masterFreeLancer.Identifier);
                    string FilePath = IO.Path.Combine(projectThumbnailPath, defaultFile.FileName);

                    if (IO.File.Exists(FilePath))
                    {
                        presentationPath = FilePath;
                    }
                }
            if (!string.IsNullOrWhiteSpace(presentationPath))
                return new FileStreamResult(new IO.FileStream(presentationPath, IO.FileMode.Open, IO.FileAccess.Read, IO.FileShare.Read), "application/octet-stream");
            else
                return new NoContentResult();
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("clear-old-photos")]
        public async Task<FincamApiActionResult<bool>> clearOldPhotos()
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            int? FreeLancerId = SecurityContext.GetFreeLancerId();
            var flag = await this.Repository.ClearOldFiles(FreeLancerId,"photos");
            if(flag==true)
            {
                result.Result = true;
            }
            return result;
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("store-videos")]
        public async Task<FincamApiActionResult<bool>> StoreVideos([FromBody] List<MasterFreeLancerFiles> vendorFiles)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };
            int? FreeLancerId = SecurityContext.GetFreeLancerId();
            await this.Repository.ClearOldFiles(FreeLancerId, "videos");
            foreach(MasterFreeLancerFiles vendorFile in vendorFiles)
            {
                try { 
                    vendorFile.FileType = "videos";
                    vendorFile.FreeLancerId = FreeLancerId;
                    vendorFile.CreatedDate = DateTime.UtcNow;
                    vendorFile.CreatedBy = SecurityContext.GetEmail();
                    vendorFile.ContentLength = 0;
                    vendorFile.ContentType = "videos";
                    await this.Repository.InsertOneAsync(vendorFile);
                }
                catch(Exception e)
                {
                    result.ErrorMsgs.Add(" Failed To Create "+e.Message);
                }
            }
            if (result.ErrorMsgs.Count == 0)
                result.Result = true;
            return result;
        }
        /*[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]*/
        [AllowAnonymous]
        [HttpPost("get-videos/{p_vendorId}")]
        public async Task<List<MasterFreeLancerFiles>> getVideos(int? p_vendorId)
        {
            var masterFreeLancerFiles = await this.Repository.GetByParamsAsync(p_vendorId, "videos");
            return masterFreeLancerFiles;
        }
    }
}
