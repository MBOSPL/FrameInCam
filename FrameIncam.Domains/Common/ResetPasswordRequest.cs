using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class ResetPasswordRequest
    {
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public string Email { get; set; }
        public string Token { get; set; }
        public bool IsValid()
        {
            if (ConfirmPassword.Equals(Password))
                return true;
            return false;
        }
    }
}
