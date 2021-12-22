using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Common.Projects
{
    public class ProjectFileUploadRequest
    {
        public int? Id { get; set; }
        public int? Code { get; set; }

        public bool IsThumbnail { get; set; } = false;
    }
}
