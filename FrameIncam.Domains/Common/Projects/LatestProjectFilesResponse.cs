using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace FrameIncam.Domains.Common.Projects
{
    public class LatestProjectFilesResponse
    {
        public int? Id { get; set; }
        public string EncodedImage { get; set; } = "";
        public string PhotographerName { get; set; } = "";
        public int? projectId { get; set; }
        public string projectIdentifier { get; set; } = "";
    }
}
