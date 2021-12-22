using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Config;
using FrameIncam.OAuth;
using FrameIncam.Web.Controllers;
using FrameIncam.WebApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;

namespace FrameIncam.WebApi
{
    public class Startup
    {
        public static IConfigurationRoot ConfigurationRoot { get; set; }
        public IConfiguration Configuration { get; }

        private static readonly LoggerFactory ConsoleLoggerFactory = new LoggerFactory(new[] { new Microsoft.Extensions.Logging.Console.ConsoleLoggerProvider((_, __) => true, true) });

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add Cors
            services.AddCors(options => options.AddPolicy("FrameIncamWebApiCorsPolicy", p_builder =>
            {
                p_builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithExposedHeaders("fincam-response-header"); ;
            }));

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });
            
            ConfigurationRoot = FrameIncam.Startup.GetConfigurationRoot(services);

            // ===== Add DbContext ========
            services.AddDbContext<FrameIncamDbContext>(options => {
                options.UseMySQL(Configuration["Data:DefaultConnection:ConnectionString"])
                 .UseLoggerFactory(ConsoleLoggerFactory);
            });

            FrameIncam.Startup.ConfigureDomainServices(services);
            FrameIncam.Domains.Startup.ConfigureRepositoryServices(services);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });
            services.AddScoped<IRazorViewToStringRenderer, RazorViewToStringRenderer>();

            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = 1 * 1024 * 1024 * 1024;
                x.MultipartBodyLengthLimit = 1 * 1024 * 1024 * 1024;
                x.MultipartHeadersCountLimit = 1 * 1024 * 1024 * 1024;
            });


            // ===== Add Identity ========
            services.AddIdentity<ConfigUser, Role>(
                x => { 
                    x.Password.RequiredLength = 6;  
                    x.Password.RequireLowercase = true;
                    x.Password.RequireDigit = true;
                    x.Password.RequireNonAlphanumeric = false; }
                )
                .AddEntityFrameworkStores<FrameIncamDbContext>()
                .AddDefaultTokenProviders();
            services.Configure<DataProtectionTokenProviderOptions>(opt =>
            opt.TokenLifespan = TimeSpan.FromHours(2));
            // Authentication
            IdentityModelEventSource.ShowPII = true;
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    NameClaimType = JwtBearer.NameClaimType,
                    RoleClaimType = JwtBearer.RoleClaimType,
                    ValidateActor = false,
                    ValidateLifetime = false,
                    ValidIssuer = Configuration[JwtBearer.Authority],
                    ValidAudience = Configuration[JwtBearer.Audience],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration[JwtBearer.JwtKey])),
                    ClockSkew = TimeSpan.Zero
                };
                options.Events = JwtBearer.Events;
            }).AddScheme<QueryAuthenticationOptions, QueryAuthenticationHandler>("Query", p_options =>
            {
                p_options.Audience = ConfigurationRoot[JwtBearer.Audience];
                p_options.Authority = ConfigurationRoot[JwtBearer.Authority];
                p_options.TokenKey = "t";
            });

            services.AddSession();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,FrameIncamDbContext dbContext, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseFileServer();
            app.UseCors("FrameIncamWebApiCorsPolicy");
            app.UseMvc();

            // ===== Create tables ======
            dbContext.Database.EnsureCreated();

            //Log 
            loggerFactory.AddLog4Net();
        }
    }
}
