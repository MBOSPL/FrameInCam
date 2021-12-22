using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FrameIncam.Client.FreeLancer.Controllers
{
    public class VendorController : Controller
    {
        public IActionResult signup()
        {
            return File("/vsignup.html", "text/html");
        }

        public IActionResult login()
        {
            return File("/vlogin.html", "text/html");
        }

        public IActionResult Index()
        {
            return File("/vhome.html", "text/html");
        }

        public IActionResult forgotpassword()
        {
            return File("/vforgotpassword.html", "text/html");
        }
    }
}