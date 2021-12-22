using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FrameIncam.Client.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return File("/Index.html", "text/html");
        }

        #region Vendor

        [Route("vendor-signup")]
        public IActionResult VendorSignup()
        {
            return File("/vsignup.html", "text/html");
        }

        [Route("vendor-signin")]
        public IActionResult VendorSignin()
        {
            return File("/vlogin.html", "text/html");
        }
        [Route("reset-password")]
        public IActionResult ResetPassword()
        {
            return File("/resetpassword.html", "text/html");
        }
        [Route("vendor-signin-for-home-subscription")]
        public IActionResult VendorSigninForHomeSubscription()
        {
            return File("/vlogin-for-home-subscription.html", "text/html");
        }
        [Route("vendor-home")]
        public IActionResult VendorHome()
        {
            return File("/vhome.html", "text/html");
        }
        [Route("subscription")]
        public IActionResult VendorSubscription()
        {
            return File("/vsubscription.html", "text/html");
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