using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FrameIncam.Domains.Models.Transaction;
using FrameIncam.Domains.Repositories.Transaction;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using IO = System.IO;
using Microsoft.Extensions.DependencyInjection;
using FrameIncam.Domains.Common;
using FrameIncam.Domains;

using FrameIncam.Domains.Common.Projects;
using FrameIncam.Domains.Models;

namespace FrameIncam.WebApi.Controllers.Transaction.Project
{
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
    [Route("api/transaction/project/file")]
    public class FileController : FrameIncamApiController<TrnProjectFiles, ITrnProjectFilesRepository>
    {
        private readonly IHostingEnvironment m_hostingEnvironment;
        public FileController(IHostingEnvironment p_hostingEnvironment)
        {
            m_hostingEnvironment = p_hostingEnvironment;
        }

        [AllowAnonymous]
        [HttpGet("get-by-project/{p_projectId}")]
        public async Task<List<TrnProjectFiles>> GetByProject(string p_projectId)
        {
            int _id;
            float i = 20;
            if (!int.TryParse(p_projectId, out _id))
                return default(List<TrnProjectFiles>);

            return await this.Repository.GetByProject(_id);
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpGet("get-approved-by-project/{p_projectId}")]
        public async Task<List<TrnProjectFiles>> GetApprovedByProject(string p_projectId)
        {
            int _id;
            if (!int.TryParse(p_projectId, out _id))
                return default(List<TrnProjectFiles>);

            ITrnProjectRepository projectRepo = this.Provider.GetService<ITrnProjectRepository>();
            TrnProject project = await projectRepo.GetByIdAsync(_id);

            List<string> unApprovedStatusList = new List<string>() { "New", "Photos Uploaded" };
            if (project == null || string.IsNullOrEmpty(project.Status) || unApprovedStatusList.Contains(project.Status))
                return default(List<TrnProjectFiles>);

            return await this.Repository.GetApprovedByProject(_id);
        }

        [HttpGet("get-default-presentation/{p_fileId}/{p_projectIdentifier?}")]
        public async Task<IActionResult> GetDefaultPresentation(string p_fileId, string p_projectIdentifier)
        {
            int _id;
            string presentationPath = IO.Path.Combine(m_hostingEnvironment.WebRootPath, "images\\no-image.jpg");

            if (int.TryParse(p_fileId, out _id))
            {
                TrnProjectFiles file = await this.Repository.GetByIdAsync(_id);

                if (file != null)
                {
                    string fileName = file.FileName;
                        if (string.IsNullOrEmpty(p_projectIdentifier))
                    {
                        ITrnProjectRepository projectRepo = this.Provider.GetService<ITrnProjectRepository>();
                        TrnProject project = await projectRepo.GetByIdAsync(file.ProjectId);

                        p_projectIdentifier = project.Identifier;
                    }

                    string projectUploadPath = GetProjectUploadPath(p_projectIdentifier);
                    string tempPresentationPath = "";
                    if (file.FileType == "thumbnail")
                        tempPresentationPath = IO.Path.Combine(projectUploadPath, "Thumbnails", fileName);
                    else
                        tempPresentationPath = IO.Path.Combine(projectUploadPath, fileName);
                    if (IO.File.Exists(tempPresentationPath))
                        presentationPath = tempPresentationPath;
                }
            }

            if (!string.IsNullOrWhiteSpace(presentationPath))
                return new FileStreamResult(new IO.FileStream(presentationPath, IO.FileMode.Open, IO.FileAccess.Read, IO.FileShare.Read), "application/octet-stream");
            else
                return new NoContentResult();
        }

        public async Task<String> GetDefaultPresentationInString(string p_fileId, string p_projectIdentifier)
        {
            int _id;
            string presentationPath = IO.Path.Combine(m_hostingEnvironment.WebRootPath, "images\\no-image.jpg");

            if (int.TryParse(p_fileId, out _id))
            {
                TrnProjectFiles file = await this.Repository.GetByIdAsync(_id);

                if (file != null)
                {
                    if (string.IsNullOrEmpty(p_projectIdentifier))
                    {
                        ITrnProjectRepository projectRepo = this.Provider.GetService<ITrnProjectRepository>();
                        TrnProject project = await projectRepo.GetByIdAsync(file.ProjectId);

                        p_projectIdentifier = project.Identifier;
                    }

                    string projectUploadPath = GetProjectUploadPath(p_projectIdentifier);
                    string tempPresentationPath = IO.Path.Combine(projectUploadPath, file.FileName);
                    if(IO.File.Exists(tempPresentationPath))
                        presentationPath = tempPresentationPath;
                }
            }

            if (!string.IsNullOrWhiteSpace(presentationPath))
            {
                byte[] imageArray = System.IO.File.ReadAllBytes(presentationPath);
                string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                return "data:image/png;base64,"+base64ImageRepresentation;
            }
            else
                return "";
        }

        [HttpPost("update-selection")]
        public async Task<FincamApiActionResult<bool>> UpdateSelection([FromBody]List<TrnProjectFiles> p_projectFiles)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool>() { Result = false };

            if (p_projectFiles != null && p_projectFiles.Count > 0)
            {
                List<int> errorCount = new List<int>();

                foreach (TrnProjectFiles file in p_projectFiles)
                {
                    if (file.id > 0)
                    {
                        try
                        {
                            TrnProjectFiles dbFile = await this.Repository.GetByIdAsync(file.id);
                            if (dbFile != null && dbFile.IsApproved != file.IsApproved)
                            {
                                dbFile.IsApproved = file.IsApproved;

                                if (dbFile.IsApproved == 1)
                                {
                                    dbFile.ApprovedBy = this.SecurityContext.GetUsername();
                                    dbFile.ApprovedDate = DateTime.UtcNow;
                                }
                                else
                                {
                                    dbFile.ApprovedBy = null;
                                    dbFile.ApprovedDate = null;
                                }

                                await this.Repository.UpdateOneAsync(dbFile);
                            }
                        }

                        catch (Exception ex)
                        {
                            errorCount.Add(file.id);
                        }
                    }
                }

                if (errorCount.Count == 0)
                    result.Result = true;
                else
                    result.ErrorMsgs.Add(string.Format("Error while updating {0} files", errorCount.Count));
            }
            else
                result.ErrorMsgs.Add("Invalid data");

            return result;
        }
        [AllowAnonymous]
        [HttpGet("get-latest-files")]
        public async Task<List<LatestProjectFilesResponse>> getLatestFiles()
        {

            ITrnProjectFilesRepository projectFilesRepo = this.Provider.GetService<ITrnProjectFilesRepository>();

            var query=projectFilesRepo.GetLatestProjectFiles(10);
            var searchQuery = (from f in query.Result
                               select new LatestProjectFilesResponse()
                               {
                                   Id = f.Id,
                                   PhotographerName = f.PhotographerName,
                                   EncodedImage=GetDefaultPresentationInString(f.Id.ToString(),f.projectIdentifier).Result
                               });
            return searchQuery.ToList();
        }
        private string GetProjectUploadPath(string p_identifier)
        {
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();

            if (string.IsNullOrEmpty(appSettings.Value.UploadFilesPath))
                return string.Empty;

            string projectFolderPath = IO.Path.Combine(appSettings.Value.UploadFilesPath, "Projects", p_identifier);

            if (!IO.Directory.Exists(projectFolderPath))
                IO.Directory.CreateDirectory(projectFolderPath);

            return projectFolderPath;
        }
    }
}