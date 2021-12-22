using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FrameIncam.Client.FreeLancer.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //return LocalRedirect("/vendor-signin");
            return File("/vlogin.html", "text/html");
        }

        #region Vendor

        [Route("vendor-signup")]
        public IActionResult VendorSignup()
        {
            return File("/vsignup.html", "text/html");
        }

        [Route("free-signin")]
        public IActionResult VendorSignin()
        {
            return File("/flogin.html", "text/html");
        }

        [Route("vendor-home")]
        public IActionResult VendorHome()
        {
            return File("/vhome.html", "text/html");
        }

        #endregion

        #region Customer
        
        [Route("customer-signup")]
        public IActionResult CustomerSignup()
        {
            return File("/csignup.html", "text/html");
        }

        [Route("customer-signin")]
        public IActionResult CustomerSignin()
        {
            return File("/clogin.html", "text/html");
        }

        #endregion
    }
}