using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FrameIncam.Client.FreeLancer.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult signup()
        {
            return File("/csignup.html", "text/html");
        }

        public IActionResult login()
        {
            return File("/clogin.html", "text/html");
        }
    }
}