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

namespace FrameIncam.WebApi.Views.Emails.ProjectCreated
{
    public class ProjectCreatedEmailViewModel
    {
        public ProjectCreatedEmailViewModel(string t_Username, string t_ClientUrl, string t_CompanyLogoPath, string projectLink,string projectPin
            ,string vendorName)
        {
            Username = t_Username;
            ClientUrl = t_ClientUrl;
            CompanyLogoPath = t_CompanyLogoPath;
            ProjectLink = projectLink;
            ProjectPin = projectPin;
            VendorName = vendorName;
        }
        public string Username { get; set; }
        public string ClientUrl { get; set; }
        public string CompanyLogoPath { get; set; }
        public string ProjectLink { get; set; }
        public string ProjectPin { get; set; }
        public String VendorName { get; set; }
    }
}