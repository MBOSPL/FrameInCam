using FrameIncam.Domains.Common.Vendor.Search;
using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Models.Transaction;
using FrameIncam.Domains.Repositories.Transaction;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Z.EntityFramework.Plus;

namespace FrameIncam.Domains.Repositories.Master.Vendor
{
    public interface IMasterVendorRepository : IRepository<MasterVendor>
    {
        Task<MasterVendor> GetByEmailAsync(string p_vendorEmail);
        Task<MasterVendor> GetByParams(string p_vendorEmail,string p_vendorMobileNo);
        Task<PaginationResults<VendorSearchResult>> Query(VendorSearchQuery p_vendorSearchQuery,int page);

        Task<PaginationResults<VendorSearchResult>> GetShortlistedVendors(int p_customerId);
        Task ToggleVendorSelection(int p_customerId, int p_vendorId);
        Task<PaginationResults<TrnVendorCustomerReview>> GetReviewsByVendor(int? p_vendorId,int page);
        Task<bool> UpdateVendor(MasterVendor masterVendor);
    }

    public class MasterVendorRepository : Repository<MasterVendor>, IMasterVendorRepository
    {
        public MasterVendorRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }
        public async Task<MasterVendor> GetByParams(string p_email, string p_mobileNo)
        {
            List<Expression<Func<MasterVendor, bool>>> filterConditions = new List<Expression<Func<MasterVendor, bool>>>();
            Expression<Func<MasterVendor, bool>> filters = null;

            if (!string.IsNullOrEmpty(p_email))
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendor>(a => a.Email, OperationExpression.Equals, p_email));

            if (!string.IsNullOrEmpty(p_mobileNo))
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendor>(a => a.Mobile, OperationExpression.Equals, p_mobileNo));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendor, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetOneAsync(filters);
        }
        public async Task<MasterVendor> GetByEmailAsync(string p_vendorEmail)
        {
            Expression<Func<MasterVendor, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendor>(a => a.Email, OperationExpression.Equals, p_vendorEmail);

            return await this.GetOneAsync(filters);
        }

        public async Task<PaginationResults<VendorSearchResult>> Query(VendorSearchQuery p_vendorSearchQuery,int page)
        {
            //Project Comment : Suriya - Get Vendors On Home Pages - Bugs Fixed - Working Properly

            int numberOfObjectsPerPage = 3;

            int pageNumber = page==null?1:page;

            #region Init filters

            List<Expression<Func<MasterVendor, bool>>> filterConditions = new List<Expression<Func<MasterVendor, bool>>>();
            Expression<Func<MasterVendor, bool>> filters = null;

            if (p_vendorSearchQuery.VendorTypeId.HasValue && p_vendorSearchQuery.VendorTypeId > 0)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendor>(a => a.TypeId, OperationExpression.Equals,
                    p_vendorSearchQuery.VendorTypeId.Value));

            //if (!string.IsNullOrEmpty(p_vendorSearchQuery.Search))
            //    filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendor,string>(a => a.Name, OperationExpression.Contains,
            //        p_vendorSearchQuery.Search));


            if (p_vendorSearchQuery.GeoCityId.HasValue && p_vendorSearchQuery.GeoCityId == 0)
                p_vendorSearchQuery.GeoCityId = null;

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendor, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            #endregion
            IQueryable<VendorSearchResult> searchQuery = null;
            #region Init query
            if (p_vendorSearchQuery.VendorTypeId.GetValueOrDefault() == 0 && p_vendorSearchQuery.GeoCityId.GetValueOrDefault() == 0)
            {
                searchQuery = (from vendor in this.GetQueryable(filters)
                                   join vendorType in DataContext.MasterVendorType on vendor.TypeId equals vendorType.id into vTypeLookup
                                   from vendorType in vTypeLookup.DefaultIfEmpty()
                                   join vendorAddress in DataContext.MasterVendorAddress on vendor.id equals vendorAddress.VendorId into vAddressLookup
                                   from vendorAddress in vAddressLookup.DefaultIfEmpty()
                                   join geoCity in DataContext.MasterGeo on vendorAddress.CityGeoId equals geoCity.id into geoCityLookup
                                   from gCity in geoCityLookup.DefaultIfEmpty()
                                    join user in DataContext.ConfigUser on vendor.Email equals user.Email
                                    where user.EmailConfirmed == true
                                    where vendorAddress.CityGeoId == (p_vendorSearchQuery.GeoCityId ?? vendorAddress.CityGeoId)
                                   where (p_vendorSearchQuery.Search != null && p_vendorSearchQuery.Search != "") ? vendor.Name.Contains(p_vendorSearchQuery.Search) : true
                                   select new VendorSearchResult()
                                   {
                                       Id = vendor.id,
                                       Location = ((gCity != null) ? gCity.GeoName : ""),
                                       Name = vendor.Name,
                                       Rating = new VendorRating()
                                       {
                                           TotalReviews = DataContext.TrnVendorCustomerReview.Where(x => x.VendorId == vendor.id).Count(),
                                           Value = 0,
                                       },
                                       Type = vendorType.Type,
                                       IsShortlisted = false
                                   });
            }
            else if(p_vendorSearchQuery.VendorTypeId.GetValueOrDefault() == 0)
            {
                searchQuery = (from vendor in this.GetQueryable(filters)
                               join vendorType in DataContext.MasterVendorType on vendor.TypeId equals vendorType.id into vTypeLookup
                               from vendorType in vTypeLookup.DefaultIfEmpty()
                               join vendorAddress in DataContext.MasterVendorAddress on vendor.id equals vendorAddress.VendorId
                               join geoCity in DataContext.MasterGeo on vendorAddress.CityGeoId equals geoCity.id into geoCityLookup
                               from gCity in geoCityLookup.DefaultIfEmpty()
                               join user in DataContext.ConfigUser on vendor.Email equals user.Email
                               where user.EmailConfirmed == true
                               where vendorAddress.CityGeoId == (p_vendorSearchQuery.GeoCityId ?? vendorAddress.CityGeoId)
                               where (p_vendorSearchQuery.Search != null && p_vendorSearchQuery.Search != "") ? vendor.Name.Contains(p_vendorSearchQuery.Search) : true
                               select new VendorSearchResult()
                               {
                                   Id = vendor.id,
                                   Location = ((gCity != null) ? gCity.GeoName : ""),
                                   Name = vendor.Name,
                                   Rating = new VendorRating()
                                   {
                                       TotalReviews = DataContext.TrnVendorCustomerReview.Where(x => x.VendorId == vendor.id).Count(),
                                       Value = 0,
                                   },
                                   Type = vendorType.Type,
                                   IsShortlisted = false
                               });
            }
            else if(p_vendorSearchQuery.GeoCityId.GetValueOrDefault() == 0)
            {
                searchQuery = (from vendor in this.GetQueryable(filters)
                               join vendorType in DataContext.MasterVendorType on vendor.TypeId equals vendorType.id
                               join vendorAddress in DataContext.MasterVendorAddress on vendor.id equals vendorAddress.VendorId into vAddressLookup
                               from vendorAddress in vAddressLookup.DefaultIfEmpty()
                               join geoCity in DataContext.MasterGeo on vendorAddress.CityGeoId equals geoCity.id into geoCityLookup
                               from gCity in geoCityLookup.DefaultIfEmpty()
                               join user in DataContext.ConfigUser on vendor.Email equals user.Email
                               where user.EmailConfirmed == true
                               where vendorAddress.CityGeoId == (p_vendorSearchQuery.GeoCityId ?? vendorAddress.CityGeoId)
                               where (p_vendorSearchQuery.Search != null && p_vendorSearchQuery.Search != "") ? vendor.Name.Contains(p_vendorSearchQuery.Search) : true
                               select new VendorSearchResult()
                               {
                                   Id = vendor.id,
                                   Location = ((gCity != null) ? gCity.GeoName : ""),
                                   Name = vendor.Name,
                                   Rating = new VendorRating()
                                   {
                                       TotalReviews = DataContext.TrnVendorCustomerReview.Where(x => x.VendorId == vendor.id).Count(),
                                       Value = 0,
                                   },
                                   Type = vendorType.Type,
                                   IsShortlisted = false
                               });
            }
            else
            {
                searchQuery = (from vendor in this.GetQueryable(filters)
                               join vendorType in DataContext.MasterVendorType on vendor.TypeId equals vendorType.id
                               join vendorAddress in DataContext.MasterVendorAddress on vendor.id equals vendorAddress.VendorId
                               join geoCity in DataContext.MasterGeo on vendorAddress.CityGeoId equals geoCity.id into geoCityLookup
                               from gCity in geoCityLookup.DefaultIfEmpty()
                               join user in DataContext.ConfigUser on vendor.Email equals user.Email
                               where user.EmailConfirmed == true
                               where vendorAddress.CityGeoId == (p_vendorSearchQuery.GeoCityId ?? vendorAddress.CityGeoId)
                               where (p_vendorSearchQuery.Search != null && p_vendorSearchQuery.Search != "") ? vendor.Name.Contains(p_vendorSearchQuery.Search) : true
                               select new VendorSearchResult()
                               {
                                   Id = vendor.id,
                                   Location = ((gCity != null) ? gCity.GeoName : ""),
                                   Name = vendor.Name,
                                   Rating = new VendorRating()
                                   {
                                       TotalReviews = DataContext.TrnVendorCustomerReview.Where(x => x.VendorId == vendor.id).Count(),
                                       Value = 0,
                                   },
                                   Type = vendorType.Type,
                                   IsShortlisted = false
                               });
            }
                searchQuery = searchQuery.OrderBy(result => result.Name);
            #endregion
            try
            {
                var totalRecords = searchQuery.Count();
                var records = await (searchQuery)
                    //.Skip(numberOfObjectsPerPage * (pageNumber - 1)).Take(numberOfObjectsPerPage)
                    .ToListAsync();
                //.Skip().Take(numberOfObjectsPerPage)
                if (p_vendorSearchQuery.CustomerId.HasValue)
                {
                    foreach (VendorSearchResult result in records)
                    {
                        result.IsShortlisted = await DataContext.TrnCustomerVendorSelection
                            .CountAsync(selection => selection.CustomerId == p_vendorSearchQuery.CustomerId.Value && selection.VendorId == result.Id) > 0;
                    }
                }


                return new PaginationResults<VendorSearchResult>()
                {
                    PageIndex = 0,
                    PageRecords = records,
                    PagesTotal = (int)totalRecords/numberOfObjectsPerPage,
                    RecordsPerPage = numberOfObjectsPerPage,
                    RecordsTotal = totalRecords
                };
            }
            catch(Exception ex)
            {

            }
            return default;
        }

        public async Task<PaginationResults<VendorSearchResult>> GetShortlistedVendors(int p_customerId)
        {
            IQueryable<TrnCustomerVendorSelection> customerSelection =
                DataContext.TrnCustomerVendorSelection.Where(sel => sel.CustomerId == p_customerId);

            var searchQuery = (from vendor in this.GetQueryable()
                               join vendorType in DataContext.MasterVendorType on vendor.TypeId equals vendorType.id
                               join vendorAddress in DataContext.MasterVendorAddress on vendor.id equals vendorAddress.VendorId into vAddressLookup
                               from vAddress in vAddressLookup.DefaultIfEmpty()
                               join geoCity in DataContext.MasterGeo on vAddress.CityGeoId equals geoCity.id into geoCityLookup
                               from gCity in geoCityLookup.DefaultIfEmpty()
                               join cSelection in customerSelection on vendor.id equals cSelection.VendorId
                               select new VendorSearchResult()
                               {
                                   Id = vendor.id,
                                   Location = ((gCity != null) ? gCity.GeoName : ""),
                                   Name = vendor.Name,
                                   Rating = new VendorRating()
                                   {
                                       TotalReviews = 0,
                                       Value = 0
                                   },
                                   Type = vendorType.Type,
                                   IsShortlisted = true
                               });

            searchQuery = searchQuery.OrderBy(result => result.Name);

            var totalRecords = searchQuery.Count();
            var records = await searchQuery.ToListAsync();

            return new PaginationResults<VendorSearchResult>()
            {
                PageIndex = 0,
                PageRecords = records,
                PagesTotal = 1,
                RecordsPerPage = totalRecords,
                RecordsTotal = totalRecords
            };
        }
        public async Task ToggleVendorSelection(int p_customerId, int p_vendorId)
        {
            ITrnCustomerVendorSelectionRepository customerVendSelectionRepo = this.Provider.GetService<ITrnCustomerVendorSelectionRepository>();

            TrnCustomerVendorSelection vendorSelection = await customerVendSelectionRepo.GetByParams(p_customerId, p_vendorId);

            if(vendorSelection != null)
                await customerVendSelectionRepo.RemoveOneAsync(vendorSelection);
            else
            {
                vendorSelection = new TrnCustomerVendorSelection()
                {
                    CustomerId = p_customerId,
                    VendorId = p_vendorId
                };
                await customerVendSelectionRepo.InsertOneAsync(vendorSelection);
            }
        }

        public async Task<PaginationResults<TrnVendorCustomerReview>> GetReviewsByVendor(int? p_vendorId,int page)
        {
            IQueryable<TrnVendorCustomerReview> customerReviews =
                DataContext.TrnVendorCustomerReview.Where(sel => sel.VendorId == p_vendorId);
            int numberOfObjectsPerPage = 5;
            customerReviews = customerReviews.OrderByDescending(result => result.CreatedDate)
                .Skip(numberOfObjectsPerPage * (page - 1)).Take(numberOfObjectsPerPage);

            var totalRecords = customerReviews.Count();
            var records = await customerReviews.ToListAsync();
            var totalPages = Math.Ceiling(((decimal) totalRecords) / numberOfObjectsPerPage);
            return new PaginationResults<TrnVendorCustomerReview>()
            {
                PageIndex = page,
                PageRecords = records,
                PagesTotal = (int)totalPages,
                RecordsPerPage = numberOfObjectsPerPage,
                RecordsTotal = totalRecords
            };
        }

        public async Task<bool> UpdateVendor(MasterVendor masterVendor)
        {
            try { 
            var p_vendorId = masterVendor.id;
            List<Expression<Func<MasterVendor, bool>>> filterConditions = new List<Expression<Func<MasterVendor, bool>>>();
            Expression<Func<MasterVendor, bool>> filters = null;

            if (p_vendorId > 0)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterVendor>(a => a.id, OperationExpression.Equals,
                    p_vendorId));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterVendor, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
                List<MasterVendor> masterVendors = await this.GetQueryable(filters).ToListAsync();
            await this.GetQueryable(filters).UpdateFromQueryAsync(x => new MasterVendor() {
                                    Name= masterVendor.Name,
                                    TypeId =masterVendor.TypeId,
                                    Email = masterVendor.Email,
                                    Mobile = masterVendor.Mobile,
                                    Description = masterVendor.Description,
                                    PaymentTerms = masterVendor.PaymentTerms,
                                    AdditionalCost = masterVendor.AdditionalCost,
                                    ExperienceLovId = masterVendor.ExperienceLovId,
                                    SiteUrl = masterVendor.SiteUrl,
                                    FbUrl = masterVendor.FbUrl,
                                    InstagramUrl = masterVendor.InstagramUrl,
                                    YoutubeUrl = masterVendor.YoutubeUrl
            });
               await this.DataContext.ConfigUser.Where(x => x.Email == masterVendor.Email)
                                .UpdateFromQueryAsync(x => new Models.Config.ConfigUser()
                                {
                                    Email= masterVendor.Email
                                });
            return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }
    }
}