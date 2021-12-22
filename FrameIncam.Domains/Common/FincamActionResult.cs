using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common
{
    public class FincamApiActionResult<T>
    {
        public T Result { get; set; }
        public List<string> ErrorMsgs { get; set; } = new List<string>();
    }
}
