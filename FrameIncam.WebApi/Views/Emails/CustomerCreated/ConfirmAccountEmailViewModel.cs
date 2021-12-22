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

namespace FrameIncam.WebApi.Views.Emails.CustomerCreated
{
    public class ConfirmAccountEmailViewModel
    {
        public ConfirmAccountEmailViewModel(string t_Username, string t_ClientUrl, string t_CompanyLogoPath, string confirmEmailUrl)
        {
            Username = t_Username;
            ClientUrl = t_ClientUrl;
            CompanyLogoPath = t_CompanyLogoPath;
            ConfirmEmailUrl = confirmEmailUrl;
        }
        public string Username { get; set; }
        public string ClientUrl { get; set; }
        public string CompanyLogoPath { get; set; }
        public string ConfirmEmailUrl { get; set; }
    }
}