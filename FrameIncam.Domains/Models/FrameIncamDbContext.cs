using FrameIncam.Domains.Models.Config;
using FrameIncam.Domains.Models.Master;
using FrameIncam.Domains.Models.Master.Customer;
using FrameIncam.Domains.Models.Master.FreeLancer;
using FrameIncam.Domains.Models.Master.Geo;
using FrameIncam.Domains.Models.Master.Lov;
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Models.Master.Vendor.Album;
using FrameIncam.Domains.Models.Transaction;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Text;

namespace FrameIncam.Domains.Models
{
    public class FrameIncamDbContext : IdentityDbContext<ConfigUser,Role,int>
    {
        public FrameIncamDbContext()
        {

        }

        public FrameIncamDbContext(DbContextOptions<FrameIncamDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(bool))
                    {
                        property.SetValueConverter(new BoolToIntConverter());
                    }
                }
            }
        }

        #region Config

        public virtual DbSet<ConfigRole> ConfigRole { get; set; }
        public virtual DbSet<ConfigUser> ConfigUser { get; set; }

        public virtual DbSet<ConfigUserRoles> ConfigUserRoles { get; set; }

        #endregion

        #region Master

        public virtual DbSet<MasterGeo> MasterGeo { get; set; }
        public virtual DbSet<MasterGeoLevel> MasterGeoLevel { get; set; }
        public virtual DbSet<MasterGeoType> MasterGeoType { get; set; }
        public virtual DbSet<MasterLov> MasterLov { get; set; }
        public virtual DbSet<MasterVendor> MasterVendor { get; set; }
        public virtual DbSet<MasterVendorAddress> MasterVendorAddress { get; set; }
        public virtual DbSet<MasterVendorService> MasterVendorService { get; set; }
        public virtual DbSet<MasterVendorServiceMap> MasterVendorServiceMap { get; set; }
        public virtual DbSet<MasterVendorType> MasterVendorType { get; set; }
        public virtual DbSet<MasterCustomer> MasterCustomer { get; set; }
        public virtual DbSet<MasterVendorAlbum> MasterVendorAlbum { get; set; }
        public virtual DbSet<MasterVendorAlbumFiles> MasterVendorAlbumFiles { get; set; }
        public virtual DbSet<MasterVendorFiles> MasterVendorFiles { get; set; }
        public virtual DbSet<MasterSubscription> MasterSubscription { get; set; }
        public virtual DbSet<MasterSubscriptionForFreeLancer> MasterSubscriptionForFreeLancer { get; set; }
        public virtual DbSet<MasterVendorSubscriptions> MasterVendorSubscriptions { get; set; }
        public virtual DbSet<MasterVendorPackage> MasterVendorPackage { get; set; }

        public virtual DbSet<MasterFreeLancer> MasterFreeLancer { get; set; }
        public virtual DbSet<MasterFreeLancerAddress> MasterFreeLancerAddress { get; set; }
        public virtual DbSet<MasterFreeLancerType> MasterFreeLancerType { get; set; }

        public virtual DbSet<MasterFreeLancerPackage> MasterFreeLancerPackage { get; set; }
        public virtual DbSet<MasterFreeLancerSubscriptions> MasterFreeLancerSubscriptions { get; set; }
        public virtual DbSet<MasterFreeLancerFiles> MasterFreeLancerFiles { get; set; }
        #endregion

        #region Transaction

        public virtual DbSet<TrnProject> TrnProject { get; set; }
        public virtual DbSet<TrnProjectFiles> TrnProjectFiles { get; set; }

        public virtual DbSet<TrnCustomerVendorSelection> TrnCustomerVendorSelection { get; set; }

        public virtual DbSet<TrnVendorFreeLancerSelection> TrnVendorFreeLancerSelection { get; set; }
        public virtual DbSet<TrnPayment> TrnPayment { get; set; }

        public virtual DbSet<TrnVendorCustomerReview> TrnVendorCustomerReview { get; set; }

        public virtual DbSet<TrnVendorCustomerReviewReplay> TrnVendorCustomerReviewReplay { get; set; }
        #endregion
    }

    public class BoolToIntConverter : ValueConverter<bool, int>
    {
        public BoolToIntConverter([CanBeNull] ConverterMappingHints mappingHints = null)
            : base(
                  v => Convert.ToInt32(v),
                  v => Convert.ToBoolean(v),
                  mappingHints)
        {
        }

        public static ValueConverterInfo DefaultInfo { get; }
            = new ValueConverterInfo(typeof(bool), typeof(int), i => new BoolToIntConverter(i.MappingHints));
    }
}