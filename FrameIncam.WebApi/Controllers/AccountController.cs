using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Primitives;
using FrameIncam.Domains.Common;
using FrameIncam.Domains.Models.Config;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Repositories.Config;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.DependencyInjection;
using FrameIncam.Domains.Repositories.Master.Vendor;
using FrameIncam.OAuth;
using FrameIncam.Domains.Models.Master.Customer;
using FrameIncam.Domains.Repositories.Master.Customer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;
using FrameIncam.WebApi.Services;
using FrameIncam.WebApi.Views.Emails.CustomerCreated;
using Microsoft.Extensions.Options;
using FrameIncam.WebApi.Views.Emails.VendorCreated;
using FrameIncam.Domains.Repositories.Master.FreeLancer;
using FrameIncam.Domains.Models.Master.FreeLancer;
using FrameIncam.Domains.Repositories.Master.Subscription;
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.WebApi.Views.Emails.ResetPassword;
using System.Web;
using System.Net;
using System.Text.RegularExpressions;
using System.Diagnostics;

namespace FrameIncam.WebApi.Controllers
{

    [Route("api/account")]
    public class AccountController : FrameIncam.Controllers.Controller
    {
        private readonly IRazorViewToStringRenderer _razorViewToStringRenderer;

        private readonly SignInManager<ConfigUser> _signInManager;
        private readonly UserManager<ConfigUser> _userManager;
        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<ConfigUser> userManager,
            SignInManager<ConfigUser> signInManager,
            IConfiguration configuration,
            IRazorViewToStringRenderer razorViewToStringRenderer
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _razorViewToStringRenderer = razorViewToStringRenderer;

        }
        [HttpGet("get-actor-mobileno/{p_mobileNo}")]
        public async Task<ActorProfile> GetActorByMobileNo(string p_mobileNo)
        {
            ActorProfile actorProfile = null;
            IMasterVendorRepository masterVendorRepo = this.Provider.GetService<IMasterVendorRepository>();
            MasterVendor masterVendor = await masterVendorRepo.GetByParams(null, p_mobileNo);
            string Email = null;
            if (masterVendor != null)
                Email = masterVendor.Email;
            if (!String.IsNullOrEmpty(Email))
            {
                ConfigUser configUser = await _userManager.FindByEmailAsync(Email);
                if (configUser != null)
                {
                    IConfigUserRoleRepository userRoleRepo = this.Provider.GetService<IConfigUserRoleRepository>();
                    var role = await userRoleRepo.GetRoleByUserId(configUser.Id);
                    IMasterVendorSubscriptionsRepository vSubRepo = this.Provider.GetService<IMasterVendorSubscriptionsRepository>();
                    var activeSubscription = await vSubRepo.GetActiveVendorSubscription(masterVendor.id);
                    actorProfile = new ActorProfile
                    {
                        Id = configUser.Id,
                        Email = Email,
                        Role = role.Name,
                        Name = configUser.Name,
                        IsHavingValidSubscription = activeSubscription != null ? true : false,
                        SubscriptionMessage = activeSubscription != null ? ("Valid Till " + activeSubscription.ValidTill.Value.ToLocalTime().ToString("dd-MM-yyyy @hh:mm tt")) : "Subscription Expired!"
                    };
                }
            }
            return actorProfile;
        }
        [HttpPost("register-vendor")]
        public async Task<FincamApiActionResult<bool>> RegisterVendor([FromBody] MasterVendor p_vendor)
        {
            FincamApiActionResult<bool> authResult = new FincamApiActionResult<bool>() { Result = false };
            string confirm_mail_token = null;
            ConfigUser _user = null;
            try
            {
                authResult.ErrorMsgs = await CanRegisterVendor(p_vendor);

                if (authResult.ErrorMsgs.Count == 0)
                {
                    ConfigUser user = new ConfigUser()
                    {
                        CreatedBy = "",
                        CreatedDate = DateTime.UtcNow,
                        Email = p_vendor.Email,
                        Name = p_vendor.Name,
                        PhoneNumber = p_vendor.Mobile,
                        UserName = p_vendor.Email
                    };

                    IdentityResult result = await _userManager.CreateAsync(user, p_vendor.Password);

                    if (result.Succeeded)
                    {
                        #region mail
                        confirm_mail_token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                        _user = user;
                        #endregion
                        //await _signInManager.SignInAsync(user, false);

                        // Map role
                        IConfigUserRoleRepository userRoleRepo = this.Provider.GetService<IConfigUserRoleRepository>();
                        await userRoleRepo.MapVendor(user.Id);

                        // Add vendor
                        IMasterVendorRepository vendorRepo = this.Provider.GetService<IMasterVendorRepository>();
                        p_vendor.Identifier = Guid.NewGuid().ToString();
                        await vendorRepo.InsertOneAsync(p_vendor);

                        //authResult.Token = await GenerateJwtToken(user);
                    }
                    else
                    {
                        var errorMsg = String.Join(",", (from IdentityError item in result.Errors select item.Description).ToArray());
                        authResult.ErrorMsgs.Add(errorMsg);
                    }
                }
            }
            catch (Exception ex)
            {
                // Get stack trace for the exception with source file information
                var st = new StackTrace(ex, true);
                // Get the top stack frame
                var frame = st.GetFrame(0);
                authResult.ErrorMsgs.Add("Vendor Creation Failed "+ex.Message+" On Line"+ frame.GetFileLineNumber());
            }
            if (authResult.ErrorMsgs.Count == 0)
            {
                IMasterVendorSubscriptionsRepository vendorSubsRepo = this.Provider.GetService<IMasterVendorSubscriptionsRepository>();
                IMasterSubscriptionRepository subscriptionsRepo = this.Provider.GetService<IMasterSubscriptionRepository>();
                MasterSubscription subscription = await subscriptionsRepo.GetByName("Trail");
                var validDays = subscription.DurationDays;
                MasterVendorSubscriptions vSub = new MasterVendorSubscriptions()
                {
                    VendorId = p_vendor.id,
                    SubscriptionId = subscription.id,
                    PaymentId = 0,
                    ValidFrom = DateTime.UtcNow,
                    ValidTill = DateTime.UtcNow.AddDays((int)validDays),
                    IsActive = true
                };
                await vendorSubsRepo.AddSubscription(vSub);
                IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token=confirm_mail_token, email = _user.Email }, Request.Scheme);
                
                var confirmAccountModel = new VendorConfirmAccountEmailViewModel(p_vendor.Name, appSettings.Value.ClientUrl, appSettings.Value.CompanyLogoPath, confirmationLink);

                string body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/VendorCreated/VendorConfirmAccount.cshtml", confirmAccountModel);

                var toAddresses = new List<string> { p_vendor.Email };
                try
                {
                    SendEmail(toAddresses, "Frame In Cam || Confirm Your Account", body, confirm_mail_token);
                    authResult.Result = true;
                }
                catch (Exception e)
                {
                    authResult.ErrorMsgs.Add("Vendor Created Successfully! But Error on Confirm Mail Sending.");
                }
            }
            return authResult;
        }

        [HttpPost("register-freelancer")]
        public async Task<FincamApiActionResult<bool>> RegisterFreeLancer([FromBody] MasterFreeLancer p_vendor)
        {
            FincamApiActionResult<bool> authResult = new FincamApiActionResult<bool>() { Result = false };
            string confirm_mail_token = null;
            ConfigUser _user = null;
            try
            {
                authResult.ErrorMsgs = await CanRegisterFreeLancer(p_vendor);

                if (authResult.ErrorMsgs.Count == 0)
                {
                    ConfigUser user = new ConfigUser()
                    {
                        CreatedBy = "",
                        CreatedDate = DateTime.UtcNow,
                        Email = p_vendor.Email,
                        Name = p_vendor.Name,
                        PhoneNumber = p_vendor.Mobile,
                        UserName = p_vendor.Email
                    };

                    IdentityResult result = await _userManager.CreateAsync(user, p_vendor.Password);

                    if (result.Succeeded)
                    {
                        #region mail
                        confirm_mail_token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                        _user = user;
                        #endregion
                        //await _signInManager.SignInAsync(user, false);

                        // Map role
                        IConfigUserRoleRepository userRoleRepo = this.Provider.GetService<IConfigUserRoleRepository>();
                        await userRoleRepo.MapFreeLancer(user.Id);

                        // Add vendor
                        IMasterFreeLancerRepository vendorRepo = this.Provider.GetService<IMasterFreeLancerRepository>();
                        p_vendor.Identifier = Guid.NewGuid().ToString();
                        await vendorRepo.InsertOneAsync(p_vendor);

                        //authResult.Token = await GenerateJwtToken(user);
                    }
                    else
                    {
                        var errorMsg = String.Join(",", (from IdentityError item in result.Errors select item.Description).ToArray());
                        authResult.ErrorMsgs.Add(errorMsg);
                    }
                }
            }
            catch (Exception ex)
            {
                authResult.ErrorMsgs.Add("Vendor Creation Failed " + ex.Message);
            }
            if (authResult.ErrorMsgs.Count == 0)
            {
                authResult.Result = true;
                IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token = confirm_mail_token, email = _user.Email }, Request.Scheme);

                var confirmAccountModel = new VendorConfirmAccountEmailViewModel(p_vendor.Name, appSettings.Value.ClientUrl, appSettings.Value.CompanyLogoPath, confirmationLink);

                string body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/VendorCreated/VendorConfirmAccount.cshtml", confirmAccountModel);

                var toAddresses = new List<string> { p_vendor.Email };
                try
                {
                    SendEmail(toAddresses, "Frame In Cam || Confirm Your Account", body, confirm_mail_token);
                }
                catch (Exception e)
                {
                    authResult.ErrorMsgs.Add("Unable To Trigger Mail!");
                }
            }
            return authResult;
        }
        [HttpPost("forgot-password/{p_email}")]
        public async Task<FincamApiActionResult<bool>> ForgotPassword(string p_email)
        {
            FincamApiActionResult<bool> authResult = new FincamApiActionResult<bool>() { Result = false };
            bool isEmail = IsValidEmail(p_email);
            ConfigUser user = null;
            if (isEmail)
                user=await _userManager.FindByEmailAsync(p_email);
            else
            {
                IMasterVendorRepository masterVendorRepository = this.Provider.GetService<IMasterVendorRepository>();
                MasterVendor masterVendor= await masterVendorRepository.GetByParams("", p_email);
                if(masterVendor!=null)
                {
                    user = await _userManager.FindByEmailAsync(masterVendor.Email);
                }
                else 
                {
                    IMasterCustomerRepository masterCustomerRepository = this.Provider.GetService<IMasterCustomerRepository>();
                    MasterCustomer masterCustomer = await masterCustomerRepository.GetByParams("", p_email);
                    if (masterCustomer != null)
                    {
                        user = await _userManager.FindByEmailAsync(masterCustomer.Email);
                    }
                }
            }
            if (user != null)
            {
                try
                {
                    IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();
                    string ClientAddress = appSettings.Value.ClientUrl;
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var uriBuilder = new UriBuilder(appSettings.Value.ClientUrl + "/reset-password");//Url.Action(appSettings.Value.ClientUrl+"/vendor-reset-password", "Account", new { token, email = user.Email }, Request.Scheme);

                    var parameters = HttpUtility.ParseQueryString(string.Empty);
                    parameters["token"] = token;
                    parameters["email"] = user.Email;
                    uriBuilder.Query = parameters.ToString();
                    Uri finalUrl = uriBuilder.Uri;
                    string callback = finalUrl.ToString();

                    var resetPasswordViewModel = new ResetPasswordEmailViewModel(user.Name, appSettings.Value.ClientUrl, appSettings.Value.CompanyLogoPath, callback);
                    string body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/ResetPassword/ResetPassword.cshtml", resetPasswordViewModel);
                    var toAddresses = new List<string> { user.Email };
                    SendEmail(toAddresses, "Frame In Cam || Reset Your Password", body, callback);
                    authResult.Result = true;
                }
                catch (Exception e)
                {
                    authResult.ErrorMsgs.Add("Reset Mail Sending Failed!");
                }
            }
            else
                authResult.ErrorMsgs.Add("Records Not Found!");
            return authResult;
        }
        [HttpPost("reset-password")]
        public async Task<FincamApiActionResult<bool>> ResetPassword([FromBody]ResetPasswordRequest resetPasswordRequest)
        {
            FincamApiActionResult<bool> result = new FincamApiActionResult<bool> { Result = false };
            List<String> errorMsgs = await CanResetPassword(resetPasswordRequest);
            if (errorMsgs.Count()>0)
            {
                result.ErrorMsgs = errorMsgs;
                return result;
            }
            var email = resetPasswordRequest.Email;
            var user = await _userManager.FindByEmailAsync(email);
            IConfigUserRoleRepository userRoleRepo = this.Provider.GetService<IConfigUserRoleRepository>();
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();
            try { 
                var updateFlag = await _userManager.ResetPasswordAsync(user, resetPasswordRequest.Token, resetPasswordRequest.Password);
                if(updateFlag.Succeeded)
                    result.Result = true;
                else
                {
                    var errorMsg = String.Join(",", (from IdentityError item in updateFlag.Errors select item.Description).ToArray());
                    result.ErrorMsgs.Add(errorMsg);
                }
                    
            }
            catch(Exception e)
            {
                result.ErrorMsgs.Add("Password Reset Failed");
            }
            return result;
        }
        private async Task<List<string>> CanResetPassword(ResetPasswordRequest p_reset)
        {
            List<string> ErrorMsgs = new List<string>();
            string strRegex = @"^[A-Za-z0-9\d=!\-@._*]*$"; // consists of only these
            string strRegex1 = @"[a-z]";// has a lowercase letter
            string strRegex2 = @"\d";//has a number
            Regex re = new Regex(strRegex);
            Regex re1 = new Regex(strRegex1);
            Regex re2 = new Regex(strRegex2);
            if (!p_reset.IsValid())
                ErrorMsgs.Add("Invalid data");
            else
            {
                if (string.IsNullOrEmpty(p_reset.Email))
                    ErrorMsgs.Add("Email is required");

                if (string.IsNullOrEmpty(p_reset.Password))
                    ErrorMsgs.Add("Password is required");
                else if(!(re.IsMatch(p_reset.Password)&& re1.IsMatch(p_reset.Password) && re2.IsMatch(p_reset.Password)))
                    ErrorMsgs.Add("Password needs to include both lower,upper case characters and atleast one number");
            }
            return ErrorMsgs;
        }
        bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
        [HttpPost("register-customer")]
        public async Task<FincamApiActionResult<bool>> RegisterCustomer([FromBody] MasterCustomer p_masterCustomer)
        {
            FincamApiActionResult<bool> authResult = new FincamApiActionResult<bool>() { Result = false };
            string confirm_mail_token = null;
            ConfigUser _user = null;
            try
            {
                authResult.ErrorMsgs = await CanRegisterCustomer(p_masterCustomer);

                if (authResult.ErrorMsgs.Count == 0)
                {
                    ConfigUser user = new ConfigUser()
                    {
                        CreatedBy = "",
                        CreatedDate = DateTime.UtcNow,
                        Email = p_masterCustomer.Email,
                        Name = p_masterCustomer.Name,
                        PhoneNumber = p_masterCustomer.Mobile,
                        UserName = p_masterCustomer.Email
                    };

                    IdentityResult result = await _userManager.CreateAsync(user, p_masterCustomer.Password);

                    if (result.Succeeded)
                    {
                        #region mail
                        confirm_mail_token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                        _user = user;
                        #endregion

                        // await _signInManager.SignInAsync(user, false);

                        // Map role
                        IConfigUserRoleRepository userRoleRepo = this.Provider.GetService<IConfigUserRoleRepository>();
                        await userRoleRepo.MapCustomer(user.Id);

                        // Add customer
                        IMasterCustomerRepository customerRepo = this.Provider.GetService<IMasterCustomerRepository>();
                        MasterCustomer existCustomer = await customerRepo.GetByParams(p_masterCustomer.Email, p_masterCustomer.Mobile);

                        if (existCustomer == null || existCustomer.id == 0)
                            await customerRepo.InsertOneAsync(p_masterCustomer);
                        /*authResult.Token = await GenerateJwtToken(user);*/
                    }
                    else
                    {
                        var errorMsg = String.Join(",", (from IdentityError item in result.Errors select item.Description).ToArray());
                        authResult.ErrorMsgs.Add(errorMsg);
                    }
                }
            }
            catch (Exception ex)
            {
                authResult.ErrorMsgs.Add("Customer Creation Failed!");
            }
            if (authResult.ErrorMsgs.Count == 0)
            {
                IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();

                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token=confirm_mail_token, email = _user.Email }, Request.Scheme);

                var confirmAccountModel = new ConfirmAccountEmailViewModel(p_masterCustomer.Name, appSettings.Value.ClientUrl, appSettings.Value.CompanyLogoPath, confirmationLink);

                string body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/CustomerCreated/ConfirmAccount.cshtml", confirmAccountModel);

                var toAddresses = new List<string> { p_masterCustomer.Email };
                try
                {
                    SendEmail(toAddresses, "Frame In Cam || Confirm Your Account", body, confirm_mail_token);
                }
                catch (Exception e)
                {
                    authResult.ErrorMsgs.Add("Unable To Trigger Confirmation Email! Contact Admin");
                }
            }
            return authResult;
        }
        [HttpGet("confirm-account")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string token, [FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            IConfigUserRoleRepository userRoleRepo = this.Provider.GetService<IConfigUserRoleRepository>();
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();
            string ClientAddress = appSettings.Value.ClientUrl;
            string ClientSecondShooter = appSettings.Value.SecondShooterClientUrl;
            if (user == null)
                return Redirect(ClientAddress + "/customer-signin?error_flag=true&message=Not%20Valid%20Link");
            ConfigRole userRoles = await userRoleRepo.GetRoleByUserId(user.Id);
            if(userRoles==null)
                return Redirect(ClientAddress + "/customer-signin?error_flag=true&message=Not%20Valid%20Link");
            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                if (userRoles.Name.ToLower() == "vendor")
                {
                    return Redirect(appSettings.Value.StaticClientUrl + "?error_flag=false&message=Email%20Verified&verified_email=" + email);
                    //return Redirect(ClientAddress + "/vendor-signin?error_flag=false&message=Email%20Verified&verified_email=" + email);
                }
                else if (userRoles.Name.ToLower() == "customer")
                {
                    return Redirect(ClientAddress + "/customer-signin?error_flag=false&message=Email%20Verified&verified_email=" + email);
                }
                else if (userRoles.Name.ToLower() == "secondshooter")
                {
                    return Redirect(ClientSecondShooter + "?error_flag=false&message=Email%20Verified&verified_email=" + email);
                }
            }
            return Redirect(ClientAddress + "/customer-signin?error_flag=true&message=Not%20Valid%20Link");
        }
        /*[HttpGet("email-trigger")]
        public async void EmailTrigger()
        {
            var confirmAccountModel = new ConfirmAccountEmailViewModel("Suriya");

            string body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/CustomerCreated/ConfirmAccount.cshtml", confirmAccountModel);

            var toAddresses = new List<string> { "sivasuriyaprakash@gmail.com" };

            SendEmail(toAddresses, "donotreply@contoso.com", "Confirm your Account", body);
        }*/
        [HttpPost("connect")]
        public async Task<AuthResult> Connect([FromBody] OpenIdConnectRequest p_request)
        {
            AuthResult authResult = new AuthResult()
            {
                ErrorMsgs = new List<string>()
            };

            #region Validation

            if (p_request == null)
                authResult.ErrorMsgs.Add("Invalid request");
            else
            {
                if (string.IsNullOrEmpty(p_request.Username))
                    authResult.ErrorMsgs.Add("Username is required");

                if (string.IsNullOrEmpty(p_request.Password))
                    authResult.ErrorMsgs.Add("Password is required");
            }

            #endregion

            if (authResult.ErrorMsgs.Count == 0)
            {
                ConfigUser user = await _userManager.FindByNameAsync(p_request.Username);

                IConfigUserRoleRepository userRoleRepo = this.Provider.GetService<IConfigUserRoleRepository>();

                if (user != null)
                {
                    var role = await userRoleRepo.GetRoleByUserId(user.Id);
                    if (role != null)
                    {
                        if (p_request.Scope != null && p_request.Scope.ToLower() != role.Name.ToLower())
                        {
                            authResult.ErrorMsgs.Add("Invalid username/password");
                            return authResult;
                        }
                        else
                        {
                            var result = await _signInManager.PasswordSignInAsync(p_request.Username, p_request.Password, false, false);

                            if (result.Succeeded)
                            {
                                if (user.EmailConfirmed != true)
                                {
                                    authResult.ErrorMsgs.Add("Please confirm your email address");
                                    return authResult;
                                }
                                authResult.Token = await GenerateJwtToken(user);
                            }
                        }
                    }
                }

                if (string.IsNullOrEmpty(authResult.Token))
                    authResult.ErrorMsgs.Add("Invalid username/password");
            }

            return authResult;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpGet("get-user")]
        public async Task<UserProfile> GetUser()
        {
            ISecurityContext securityContext = this.Provider.GetService<ISecurityContext>();
            string userEmail = securityContext.GetEmail();

            if (string.IsNullOrEmpty(userEmail))
                return default(UserProfile);

            ConfigUser user = await _userManager.FindByEmailAsync(userEmail);
            ConfigRole role = null;

            if (user != null)
            {
                IConfigUserRoleRepository userRoleRepo = this.Provider.GetService<IConfigUserRoleRepository>();
                role = await userRoleRepo.GetRoleByUserId(user.Id);
            }

            UserProfile profile = new UserProfile()
            {
                Role = role,
                User = user,
                CustomerId = securityContext.GetCustomerId(),
                VendorId = securityContext.GetVendorId(),
                FreeLancerId=securityContext.GetFreeLancerId()
            };

            return profile;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme + ",Query")]
        [HttpGet("get-customer")]
        public async Task<CustomerProfile> GetCustomer([FromQuery(Name = "email")] string email)
        {
            //Project Comment : Suriya - Get Customer On Project Creation - Newly Added! - Working Properly

            MasterCustomer masterCustomer = null;

            IMasterCustomerRepository customerRepo = this.Provider.GetService<IMasterCustomerRepository>();
            if (string.IsNullOrEmpty(email))
            {
                return null;
            }
            masterCustomer = await customerRepo.GetByParams(email, null);
            if (masterCustomer != null)
            {
                CustomerProfile customerProfile = new CustomerProfile()
                {
                    customerId = masterCustomer.id,
                    customerAddressLine1 = masterCustomer.AddressLine1,
                    customerAddressLine2 = masterCustomer.AddressLine2,
                    customerAltMobileNo = masterCustomer.AlternateMobile,
                    customerCity = masterCustomer.City,
                    customerEmail = masterCustomer.Email,
                    customerMobileNo = masterCustomer.Mobile,
                    customerName = masterCustomer.Name,
                    customerPin = masterCustomer.Pincode
                };
                return customerProfile;
            }
            else
            {
                return null;
            }
        }
        private async Task<List<string>> CanRegisterVendor(MasterVendor p_vendor)
        {
            List<string> ErrorMsgs = new List<string>();
            string strRegex = @"^[A-Za-z0-9\d=!\-@._*]*$"; // consists of only these
            string strRegex1 = @"[a-z]";// has a lowercase letter
            string strRegex2 = @"\d";//has a number
            Regex re = new Regex(strRegex);
            Regex re1 = new Regex(strRegex1);
            Regex re2 = new Regex(strRegex2);

            if (p_vendor == null)
                ErrorMsgs.Add("Invalid data");
            else
            {
                if (string.IsNullOrEmpty(p_vendor.Email))
                    ErrorMsgs.Add("Email is required");
                else
                {
                    ConfigUser user = await _userManager.FindByEmailAsync(p_vendor.Email);
                    if (user != null)
                        ErrorMsgs.Add("Email already exists");
                }
                if (string.IsNullOrEmpty(p_vendor.Mobile))
                    ErrorMsgs.Add("Mobile is required");
                else
                {
                    IMasterVendorRepository vendorRepo = this.Provider.GetService<IMasterVendorRepository>();
                    MasterVendor vendor = await vendorRepo.GetByParams("",p_vendor.Mobile);

                    if (vendor != null && vendor.Email != p_vendor.Email)
                        ErrorMsgs.Add("Mobile already exists");
                }
                if (string.IsNullOrEmpty(p_vendor.Name))
                    ErrorMsgs.Add("Name is required");

                if (string.IsNullOrEmpty(p_vendor.Password))
                    ErrorMsgs.Add("Password is required");
                else if (!(re.IsMatch(p_vendor.Password) && re1.IsMatch(p_vendor.Password) && re2.IsMatch(p_vendor.Password)))
                    ErrorMsgs.Add("Password needs to include both lower,upper case characters and atleast one number");
                if (p_vendor.TypeId == null || p_vendor.TypeId == 0)
                    ErrorMsgs.Add("Type is required");
            }

            return ErrorMsgs;
        }
        private async Task<List<string>> CanRegisterFreeLancer(MasterFreeLancer p_vendor)
        {
            List<string> ErrorMsgs = new List<string>();

            if (p_vendor == null)
                ErrorMsgs.Add("Invalid data");
            else
            {
                if (string.IsNullOrEmpty(p_vendor.Email))
                    ErrorMsgs.Add("Email is required");
                else
                {
                    ConfigUser user = await _userManager.FindByEmailAsync(p_vendor.Email);
                    if (user != null)
                        ErrorMsgs.Add("Email already exists");
                }
                if (string.IsNullOrEmpty(p_vendor.Mobile))
                    ErrorMsgs.Add("Mobile is required");

                if (string.IsNullOrEmpty(p_vendor.Name))
                    ErrorMsgs.Add("Name is required");

                if (string.IsNullOrEmpty(p_vendor.Password))
                    ErrorMsgs.Add("Password is required");

                if (p_vendor.TypeId == null || p_vendor.TypeId == 0)
                    ErrorMsgs.Add("Type is required");
            }

            return ErrorMsgs;
        }

        private async Task<List<string>> CanRegisterCustomer(MasterCustomer p_customer)
        {
            List<string> ErrorMsgs = new List<string>();
            string strRegex = @"^[A-Za-z0-9\d=!\-@._*]*$"; // consists of only these
            string strRegex1 = @"[a-z]";// has a lowercase letter
            string strRegex2 = @"\d";//has a number
            Regex re = new Regex(strRegex);
            Regex re1 = new Regex(strRegex1);
            Regex re2 = new Regex(strRegex2);
            if (p_customer == null)
                ErrorMsgs.Add("Invalid data");
            else
            {
                if (string.IsNullOrEmpty(p_customer.Email))
                    ErrorMsgs.Add("Email is required");
                else
                {
                    ConfigUser user = await _userManager.FindByEmailAsync(p_customer.Email);
                    if (user != null)
                        ErrorMsgs.Add("Email already exists");
                }

                if (string.IsNullOrEmpty(p_customer.Mobile))
                    ErrorMsgs.Add("Mobile is required");
                else
                {
                    IMasterCustomerRepository customerRepo = this.Provider.GetService<IMasterCustomerRepository>();
                    MasterCustomer customer = await customerRepo.GetByParams(p_email: "", p_mobileNo: p_customer.Mobile);

                    if (customer != null && customer.Email != p_customer.Email)
                        ErrorMsgs.Add("Mobile already exists");
                }

                if (string.IsNullOrEmpty(p_customer.Name))
                    ErrorMsgs.Add("Name is required");

                if (string.IsNullOrEmpty(p_customer.Password))
                    ErrorMsgs.Add("Password is required");
                else if (!(re.IsMatch(p_customer.Password) && re1.IsMatch(p_customer.Password) && re2.IsMatch(p_customer.Password)))
                    ErrorMsgs.Add("Password needs to include both lower,upper case characters and atleast one number");
            }

            return ErrorMsgs;
        }

        private async Task<string> GenerateJwtToken(ConfigUser p_user)
        {
            var claims = new List<Claim>(){
                new Claim(OpenIdConnectConstants.Claims.Subject, p_user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(OpenIdConnectConstants.Claims.Name, p_user.Name),
                new Claim(OpenIdConnectConstants.Claims.Username,p_user.Email),
                new Claim(OpenIdConnectConstants.Claims.Email,p_user.Email)
            };

            IConfigUserRoleRepository userRoleRepo = this.Provider.GetService<IConfigUserRoleRepository>();
            ConfigRole role = await userRoleRepo.GetRoleByUserId(p_user.Id);

            if (role != null)
            {
                string roleName = role.Name.ToLower();

                switch (roleName)
                {
                    case "vendor":
                        IMasterVendorRepository vendorRepo = this.Provider.GetService<IMasterVendorRepository>();
                        MasterVendor vendor = await vendorRepo.GetByEmailAsync(p_user.Email);
                        claims.Add(new Claim("IsVendor", true.ToString()));

                        if (vendor != null)
                        {
                            claims.Add(new Claim("VendorId", vendor.id.ToString()));
                            if (!string.IsNullOrEmpty(vendor.Identifier))
                                claims.Add(new Claim("VendorIdentifier", vendor.Identifier));
                        }

                        break;
                    case "customer":
                        IMasterCustomerRepository customerRepo = this.Provider.GetService<IMasterCustomerRepository>();
                        MasterCustomer customer = await customerRepo.GetByParams(p_email: p_user.Email, "");

                        claims.Add(new Claim("IsCustomer", true.ToString()));

                        if (customer != null)
                            claims.Add(new Claim("CustomerId", customer.id.ToString()));

                        break;
                    case "secondshooter":
                        IMasterFreeLancerRepository freelancerRepo = this.Provider.GetService<IMasterFreeLancerRepository>();
                        MasterFreeLancer masterFreeLancer = await freelancerRepo.GetByEmailAsync(p_user.Email);
                        claims.Add(new Claim("IsFreeLancer", true.ToString()));

                        if (masterFreeLancer != null)
                        {
                            claims.Add(new Claim("FreeLancerId", masterFreeLancer.id.ToString()));
                            if (!string.IsNullOrEmpty(masterFreeLancer.Identifier))
                                claims.Add(new Claim("FreeLancerIdentifier", masterFreeLancer.Identifier));
                        }

                        break;
                }
            }

            // Audience
            claims.Add(new Claim(OpenIdConnectConstants.Claims.Audience, _configuration[JwtBearer.Audience]));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration[JwtBearer.JwtKey]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration[JwtBearer.Authority],
                _configuration[JwtBearer.Audience],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private async void SendEmail(List<string> toAddresses, string subject, string body, string confirm_mail_token)
        {
            IOptions<AppSettings> appSettings = this.Provider.GetService<IOptions<AppSettings>>();

            string fromAddress = appSettings.Value.SmtpMail;

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(fromAddress, fromAddress));
            foreach (var to in toAddresses)
            {
                message.To.Add(new MailboxAddress(to, to));
            }
            message.Subject = subject;

            message.Body = new TextPart(TextFormat.Html)
            {
                Text = body
            };

            var client = new SmtpClient
            {

                // For demo-purposes, accept all SSL certificates
                ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true
            };

            await client.ConnectAsync(appSettings.Value.SmtpHost, appSettings.Value.SmtpPort, false);
            //client.Connect("127.0.0.1", 25, false);
            await client.AuthenticateAsync(fromAddress, appSettings.Value.SmtpPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

    }
}