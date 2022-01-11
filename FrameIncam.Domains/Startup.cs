using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Geo;
using FrameIncam.Domains.Repositories.Config;
using FrameIncam.Domains.Repositories.Master.Customer;
using FrameIncam.Domains.Repositories.Master.FreeLancer;
using FrameIncam.Domains.Repositories.Master.Lov;
using FrameIncam.Domains.Repositories.Master.Subscription;
using FrameIncam.Domains.Repositories.Master.Vendor;
using FrameIncam.Domains.Repositories.Transaction;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains
{
    public static class Startup
    {
        public static void ConfigureRepositoryServices(IServiceCollection p_services)
        {
            ConfigureUserServices(p_services);
            ConfigureMasterServices(p_services);
            ConfigureGeoServices(p_services);
            ConfigureTransactionServices(p_services);
        }

        public static void ConfigureMasterServices(IServiceCollection p_services)
        {
            p_services.AddScoped<IMasterVendorTypeRepository>(p_provider => new MasterVendorTypeRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterVendorRepository>(p_provider => new MasterVendorRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterVendorAddressRepository>(p_provider => new MasterVendorAddressRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterVendorServiceMapRepository>(p_provider => new MasterVendorServiceMapRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterVendorServiceRepository>(p_provider => new MasterVendorServiceRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterLovRepository>(p_provider => new MasterLovRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterCustomerRepository>(p_provider => new MasterCustomerRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterSubscriptionRepository>(p_provider => new MasterSubscriptionRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterVendorSubscriptionsRepository>(p_provider => new MasterVendorSubscriptionsRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterVendorPackageRepository>(p_provider => new MasterVendorPackageRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped <IMasterCustomerRepository>(p_provider => new MasterCustomerRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
                
            p_services.AddScoped <IMasterVendorFilesRepository>(p_provider => new MasterVendorFilesRepository(p_provider,
                    p_provider.GetService<FrameIncamDbContext>()));

            p_services.AddScoped<IMasterVendorTypeRepository>(p_provider => new MasterVendorTypeRepository(p_provider,
                   p_provider.GetService<FrameIncamDbContext>()));

            #region Freelancer
            p_services.AddScoped<IMasterFreeLancerTypeRepository>(p_provider => new MasterFreeLancerTypeRepository(p_provider,
            p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterFreeLancerRepository>(p_provider => new MasterFreeLancerRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterFreeLancerAddressRepository>(p_provider => new MasterFreeLancerAddressRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterFreeLancerSubscriptionsRepository>(p_provider => new MasterFreeLancerSubscriptionsRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterFreeLancerPackageRepository>(p_provider => new MasterFreeLancerPackageRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterFreeLancerFilesRepository>(p_provider => new MasterFreeLancerFilesRepository(p_provider,
                   p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IMasterSubscriptionForFreeLancerRepository>(p_provider => new MasterSubscriptionForFreeLancerRepository(p_provider,
                   p_provider.GetService<FrameIncamDbContext>()));

            #endregion
        }

        public static void ConfigureUserServices(IServiceCollection p_services)
        {
            p_services.AddScoped<IConfigRoleRepository>(p_provider => new ConfigRoleRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            p_services.AddScoped<IConfigUserRoleRepository>(p_provider => new ConfigUserRoleRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
        }
        public static void ConfigureGeoServices(IServiceCollection p_services)
        {
            p_services.AddScoped<IMasterGeoRepository>(p_provider => new MasterGeoRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
        }
        public static void ConfigureTransactionServices(IServiceCollection p_services)
        {
            p_services.AddScoped<ITrnProjectRepository>(p_provider => new TrnProjectRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));
            
            p_services.AddScoped<ITrnProjectFilesRepository>(p_provider => new TrnProjectFilesRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));

            p_services.AddScoped<ITrnCustomerVendorSelectionRepository>(p_provider => new TrnCustomerVendorSelectionRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));

            p_services.AddScoped <ITrnVendorFreeLancerSelectionRepository>(p_provider => new TrnVendorFreeLancerSelectionRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));

            p_services.AddScoped<ITrnPaymentRepository>(p_provider => new TrnPaymentRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));

            p_services.AddScoped<ITrnVendorCustomerReviewRepository>(p_provider => new TrnVendorCustomerReviewRepository(p_provider,
                p_provider.GetService<FrameIncamDbContext>()));

            p_services.AddScoped<ITrnVendorCustomerReviewReplayRepository>(p_provider => new TrnVendorCustomerReviewReplayRepository(p_provider,
                    p_provider.GetService<FrameIncamDbContext>()));
        }
    }
}