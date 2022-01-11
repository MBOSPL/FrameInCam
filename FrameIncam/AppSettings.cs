using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam
{
    public class AppSettings
    {
        public string UploadFilesPath { get; set; }
        public string TempFilesPath { get; set; }
        public string RazorPayKeyId { get; set; }
        public string RazorPayKeySecret { get; set; }
        public string PhotographerMSILink { get; set; }
        public string PhotographerMSIVersionCode { get; set; }
        public string SecondShooterMSILink { get; set; }
        public string SmtpMail { get; set; }
        public string SmtpHost{ get; set; }
        public int SmtpPort { get; set; }
        public string SmtpPassword { get; set; }
        public string SmtpEncryption { get; set; }
        public string ClientUrl { get; set; }
        public string StaticClientUrl { get; set; }
        public string SecondShooterClientUrl { get; set; }
        public string CompanyLogoPath { get; set; }
        public int MaxProfilePhotoSizeInMB { get; set; }
    }
}