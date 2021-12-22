using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace FrameIncam.OAuth
{
    public interface ISecurityContext
    {
        ClaimsPrincipal Principal { get; set; }
        ClaimsIdentity Identity { get; }
        Uri RequestUri { get; set; }
        string ClientId { get; set; }
        bool HasClaim(string p_claim, string p_value);
        string GetClaim(string p_claim);
        string[] GetClaims(string p_claim);
        string GetUsername();
        string GetName();
        string GetEmail();
        bool IsVendor();
        int? GetVendorId();
        int? GetCustomerId();
        int? GetFreeLancerId();
        string GetVendorIdentifier();
        string[] GetRoles();
    }

    internal class SecurityContext : ISecurityContext
    {
        const string emailaddress = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
        const string name = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
        const string nameidentifier = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

        protected IOptions<AppSettings> AppSettings { get; private set; }
        public SecurityContext(IServiceProvider p_provider)
        {
            AppSettings = p_provider.GetService<IOptions<AppSettings>>();
        }

        public ClaimsPrincipal Principal { get; set; }
        public ClaimsIdentity Identity
        {
            get
            {
                if (this.Principal == null
                    || !(this.Principal.Identity is ClaimsIdentity))
                {
                    return null;
                }

                return (ClaimsIdentity)this.Principal.Identity;
            }
        }
        public Uri RequestUri { get; set; }
        public string ClientId { get; set; }

        public bool HasClaim(string p_claim, string p_value)
        {
            if (string.IsNullOrEmpty(p_claim)
                || this.Identity == null
                )
            {
                return false;
            }

            return this.Identity.HasClaim(p_claim, p_value);
        }

        public string[] GetClaims(string p_claim)
        {
            if (string.IsNullOrEmpty(p_claim)
                || this.Identity == null
                )
            {
                return null;
            }

            return this.Identity.Claims.Where(i => p_claim.Equals(i.Type)).Select(i => i.Value).ToArray();
        }

        public string GetClaim(string p_claim)
        {
            if (string.IsNullOrEmpty(p_claim)
                || this.Identity == null
                )
            {
                return null;
            }

            Claim claim = this.Identity.Claims.FirstOrDefault(i => p_claim.Equals(i.Type));
            if (claim == null)
                return null;

            return claim.Value;
        }

        public string[] GetRoles()
        {
            return this.GetClaims(System.Security.Claims.ClaimTypes.Role);
        }

        public string GetUsername()
        {
            string username = this.GetClaim("username");
            if (string.IsNullOrWhiteSpace(username))
                return null;

            return username.Trim().ToLowerInvariant();
        }

        public string GetName()
        {
            string name = this.GetClaim("name");
            if (string.IsNullOrWhiteSpace(name))
                return null;

            return name.Trim();
        }

        public string GetEmail()
        {
            string email = this.GetClaim(emailaddress);
            if (string.IsNullOrWhiteSpace(email))
                return null;

            return email.Trim();
        }
        public int? GetVendorId()
        {
            string vendorId = this.GetClaim("VendorId");
            if (string.IsNullOrWhiteSpace(vendorId) || !int.TryParse(vendorId, out int vendorIdValue))
                return null;

            return vendorIdValue;
        }
        public int? GetCustomerId()
        {
            string customerId = this.GetClaim("CustomerId");
            if (string.IsNullOrWhiteSpace(customerId) || !int.TryParse(customerId, out int customerIdValue))
                return null;

            return customerIdValue;
        }
        public string GetVendorIdentifier()
        {
            string vendorIdentifier = this.GetClaim("VendorIdentifier");
            if (string.IsNullOrWhiteSpace(vendorIdentifier))
                return null;

            return vendorIdentifier.Trim();
        }
        public bool IsVendor()
        {
            string isVendor = this.GetClaim("IsVendor");
            if (string.IsNullOrWhiteSpace(isVendor) || !bool.TryParse(isVendor, out bool isVendorValue))
                return false;

            return isVendorValue;
        }

        public int? GetFreeLancerId()
        {
            string freeLancerId = this.GetClaim("FreeLancerId");
            if (string.IsNullOrWhiteSpace(freeLancerId) || !int.TryParse(freeLancerId, out int freeLancerIdValue))
                return null;

            return freeLancerIdValue;
        }
    }
}
