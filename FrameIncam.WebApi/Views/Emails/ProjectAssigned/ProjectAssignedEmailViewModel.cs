using FrameIncam.Controllers;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Repositories;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using FrameIncam.OAuth;
using FrameIncam.Web.Controllers;

namespace FrameIncam.WebApi.Views.Emails.ProjectAssigned
{
    public class ProjectAssignedEmailViewModel
    {
        public ProjectAssignedEmailViewModel(string t_Username, string t_ClientUrl, string projectName, string projectUrl,string assignedBy)
        {
            Username = t_Username;
            ClientUrl = t_ClientUrl;
            ProjectUrl = projectUrl;
            ProjectName = projectName;
            AssignedBy = assignedBy;
        }
        public string Username { get; set; }
        public string ClientUrl { get; set; }
        public string ProjectUrl { get; set; }
        public string ProjectName { get; set; }
        public string AssignedBy { get; set; }
    }
}