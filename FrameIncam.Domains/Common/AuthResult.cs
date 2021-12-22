using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class AuthResult
    {
        public string Token { get; set; }
        public List<string> ErrorMsgs { get; set; }
    }
}
