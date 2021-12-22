using FrameIncam.Domains.Common.FreeLancer.Search;
using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.FreeLancer;
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

namespace FrameIncam.Domains.Repositories.Master.FreeLancer
{
    public interface IMasterFreeLancerRepository : IRepository<MasterFreeLancer>
    {
        Task<MasterFreeLancer> GetByEmailAsync(string p_freelancerEmail);
        Task<PaginationResults<FreeLancerSearchResult>> Query(FreeLancerSearchQuery p_freelancerSearchQuery,int page);

        Task<PaginationResults<FreeLancerSearchResult>> GetShortlistedFreeLancers(int p_customerId);
         
        Task ToggleFreeLancerSelection(int p_customerId, int p_freelancerId);

        Task<bool> UpdateFreeLancer(MasterFreeLancer masterFreeLancer);
    }

    public class MasterFreeLancerRepository : Repository<MasterFreeLancer>, IMasterFreeLancerRepository
    {
        public MasterFreeLancerRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        public async Task<MasterFreeLancer> GetByEmailAsync(string p_freelancerEmail)
        {
            Expression<Func<MasterFreeLancer, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancer>(a => a.Email, OperationExpression.Equals, p_freelancerEmail);

            return await this.GetOneAsync(filters);
        }

        public async Task<PaginationResults<FreeLancerSearchResult>> Query(FreeLancerSearchQuery p_freelancerSearchQuery,int page)
        {
            //Project Comment : Suriya - Get FreeLancers On Home Pages - Bugs Fixed - Working Properly

            int numberOfObjectsPerPage = 3;

            int pageNumber = page==null?1:page;

            #region Init filters

            List<Expression<Func<MasterFreeLancer, bool>>> filterConditions = new List<Expression<Func<MasterFreeLancer, bool>>>();
            Expression<Func<MasterFreeLancer, bool>> filters = null;

            if (p_freelancerSearchQuery.FreeLancerTypeId.HasValue && p_freelancerSearchQuery.FreeLancerTypeId > 0)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancer>(a => a.TypeId, OperationExpression.Equals,
                    p_freelancerSearchQuery.FreeLancerTypeId.Value));

            //if (!string.IsNullOrEmpty(p_freelancerSearchQuery.Search))
            //    filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancer,string>(a => a.Name, OperationExpression.Contains,
            //        p_freelancerSearchQuery.Search));


            if (p_freelancerSearchQuery.GeoCityId.HasValue && p_freelancerSearchQuery.GeoCityId == 0)
                p_freelancerSearchQuery.GeoCityId = null;

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<MasterFreeLancer, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            #endregion
            IQueryable<FreeLancerSearchResult> searchQuery = null;
            #region Init query
            if (p_freelancerSearchQuery.FreeLancerTypeId.GetValueOrDefault()==0 && p_freelancerSearchQuery.GeoCityId.GetValueOrDefault()==0)
            {
                searchQuery = (from freelancer in this.GetQueryable(filters)
                               join freelancerType in DataContext.MasterFreeLancerType on freelancer.TypeId equals freelancerType.id into vTypeLookup
                               from freelancerType in vTypeLookup.DefaultIfEmpty()
                               join freelancerAddress in DataContext.MasterFreeLancerAddress on freelancer.id equals freelancerAddress.FreeLancerId into vAddressLookup
                               from freelancerAddress in vAddressLookup.DefaultIfEmpty()
                               join geoCity in DataContext.MasterGeo on freelancerAddress.CityGeoId equals geoCity.id into geoCityLookup
                               from gCity in geoCityLookup.DefaultIfEmpty()
                               join subscription in DataContext.MasterFreeLancerSubscriptions on freelancer.id equals subscription.FreeLancerId
                               where subscription.ValidTill > DateTime.UtcNow
                               join user in DataContext.ConfigUser on freelancer.Email equals user.Email
                               where user.EmailConfirmed == true
                               where freelancerAddress.CityGeoId == (p_freelancerSearchQuery.GeoCityId ?? freelancerAddress.CityGeoId)
                               where (p_freelancerSearchQuery.Search != null && p_freelancerSearchQuery.Search != "") ? freelancer.Name.Contains(p_freelancerSearchQuery.Search) : true
                               select new FreeLancerSearchResult()
                               {
                                   Id = freelancer.id,
                                   Location = ((gCity != null) ? gCity.GeoName : ""),
                                   Name = freelancer.Name,
                                   Rating = new FreeLancerRating()
                                   {
                                       TotalReviews = 0,
                                       Value = 0
                                   },
                                   Type = freelancerType.Type,
                                   IsShortlisted = false
                               }) ;
            }
            else if (p_freelancerSearchQuery.FreeLancerTypeId.GetValueOrDefault()==0)
            {
                searchQuery = (from freelancer in this.GetQueryable(filters)
                               join freelancerType in DataContext.MasterFreeLancerType on freelancer.TypeId equals freelancerType.id into vTypeLookup
                               from freelancerType in vTypeLookup.DefaultIfEmpty()
                               join freelancerAddress in DataContext.MasterFreeLancerAddress on freelancer.id equals freelancerAddress.FreeLancerId
                               join geoCity in DataContext.MasterGeo on freelancerAddress.CityGeoId equals geoCity.id into geoCityLookup
                               from gCity in geoCityLookup.DefaultIfEmpty()
                               join subscription in DataContext.MasterFreeLancerSubscriptions on freelancer.id equals subscription.FreeLancerId
                               where subscription.ValidTill > DateTime.UtcNow
                               join user in DataContext.ConfigUser on freelancer.Email equals user.Email
                               where user.EmailConfirmed == true
                               where freelancerAddress.CityGeoId == (p_freelancerSearchQuery.GeoCityId ?? freelancerAddress.CityGeoId)
                               where (p_freelancerSearchQuery.Search != null && p_freelancerSearchQuery.Search != "") ? freelancer.Name.Contains(p_freelancerSearchQuery.Search) : true
                               select new FreeLancerSearchResult()
                               {
                                   Id = freelancer.id,
                                   Location = ((gCity != null) ? gCity.GeoName : ""),
                                   Name = freelancer.Name,
                                   Rating = new FreeLancerRating()
                                   {
                                       TotalReviews = 0,
                                       Value = 0
                                   },
                                   Type = freelancerType.Type,
                                   IsShortlisted = false
                               });
            }
            else if(p_freelancerSearchQuery.GeoCityId.GetValueOrDefault()==0)
            {
                searchQuery = (from freelancer in this.GetQueryable(filters)
                               join freelancerType in DataContext.MasterFreeLancerType on freelancer.TypeId equals freelancerType.id
                               join freelancerAddress in DataContext.MasterFreeLancerAddress on freelancer.id equals freelancerAddress.FreeLancerId into vAddressLookup
                               from freelancerAddress in vAddressLookup.DefaultIfEmpty()
                               join geoCity in DataContext.MasterGeo on freelancerAddress.CityGeoId equals geoCity.id into geoCityLookup
                               from gCity in geoCityLookup.DefaultIfEmpty()
                               join subscription in DataContext.MasterFreeLancerSubscriptions on freelancer.id equals subscription.FreeLancerId
                               where subscription.ValidTill > DateTime.UtcNow
                               join user in DataContext.ConfigUser on freelancer.Email equals user.Email
                               where user.EmailConfirmed == true
                               where freelancerAddress.CityGeoId == (p_freelancerSearchQuery.GeoCityId ?? freelancerAddress.CityGeoId)
                               where (p_freelancerSearchQuery.Search != null && p_freelancerSearchQuery.Search != "") ? freelancer.Name.Contains(p_freelancerSearchQuery.Search) : true
                               select new FreeLancerSearchResult()
                               {
                                   Id = freelancer.id,
                                   Location = ((gCity != null) ? gCity.GeoName : ""),
                                   Name = freelancer.Name,
                                   Rating = new FreeLancerRating()
                                   {
                                       TotalReviews = 0,
                                       Value = 0
                                   },
                                   Type = freelancerType.Type,
                                   IsShortlisted = false
                               });
            }
            else
            {
                searchQuery = (from freelancer in this.GetQueryable(filters)
                               join freelancerType in DataContext.MasterFreeLancerType on freelancer.TypeId equals freelancerType.id
                               join freelancerAddress in DataContext.MasterFreeLancerAddress on freelancer.id equals freelancerAddress.FreeLancerId
                               join geoCity in DataContext.MasterGeo on freelancerAddress.CityGeoId equals geoCity.id into geoCityLookup
                               from gCity in geoCityLookup.DefaultIfEmpty()
                               join subscription in DataContext.MasterFreeLancerSubscriptions on freelancer.id equals subscription.FreeLancerId
                               where subscription.ValidTill > DateTime.UtcNow
                               join user in DataContext.ConfigUser on freelancer.Email equals user.Email
                               where user.EmailConfirmed == true
                               where freelancerAddress.CityGeoId == (p_freelancerSearchQuery.GeoCityId ?? freelancerAddress.CityGeoId)
                               where (p_freelancerSearchQuery.Search != null && p_freelancerSearchQuery.Search != "") ? freelancer.Name.Contains(p_freelancerSearchQuery.Search) : true
                               select new FreeLancerSearchResult()
                               {
                                   Id = freelancer.id,
                                   Location = ((gCity != null) ? gCity.GeoName : ""),
                                   Name = freelancer.Name,
                                   Rating = new FreeLancerRating()
                                   {
                                       TotalReviews = 0,
                                       Value = 0
                                   },
                                   Type = freelancerType.Type,
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
                if (p_freelancerSearchQuery.VendorId.HasValue)
                {
                    foreach (FreeLancerSearchResult result in records)
                    {
                        result.IsShortlisted = await DataContext.TrnVendorFreeLancerSelection
                            .CountAsync(selection => selection.VendorId == p_freelancerSearchQuery.VendorId.Value && selection.FreelancerId == result.Id) > 0;
                    }
                }


                return new PaginationResults<FreeLancerSearchResult>()
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

        public async Task<PaginationResults<FreeLancerSearchResult>> GetShortlistedFreeLancers(int p_vendorId)
        {
            IQueryable<TrnVendorFreeLancerSelection> customerSelection =
                DataContext.TrnVendorFreeLancerSelection.Where(sel => sel.VendorId == p_vendorId);

            var searchQuery = (from freelancer in this.GetQueryable()
                               join freelancerType in DataContext.MasterFreeLancerType on freelancer.TypeId equals freelancerType.id
                               join freelancerAddress in DataContext.MasterFreeLancerAddress on freelancer.id equals freelancerAddress.FreeLancerId into vAddressLookup
                               from vAddress in vAddressLookup.DefaultIfEmpty()
                               join geoCity in DataContext.MasterGeo on vAddress.CityGeoId equals geoCity.id into geoCityLookup
                               from gCity in geoCityLookup.DefaultIfEmpty()
                               join cSelection in customerSelection on freelancer.id equals cSelection.FreelancerId
                               join subscription in DataContext.MasterFreeLancerSubscriptions on freelancer.id equals subscription.FreeLancerId
                               where subscription.ValidTill > DateTime.UtcNow
                               select new FreeLancerSearchResult()
                               {
                                   Id = freelancer.id,
                                   Location = ((gCity != null) ? gCity.GeoName : ""),
                                   Name = freelancer.Name,
                                   Rating = new FreeLancerRating()
                                   {
                                       TotalReviews = 0,
                                       Value = 0
                                   },
                                   Type = freelancerType.Type,
                                   IsShortlisted = true
                               });

            searchQuery = searchQuery.OrderBy(result => result.Name);

            var totalRecords = searchQuery.Count();
            var records = await searchQuery.ToListAsync();

            return new PaginationResults<FreeLancerSearchResult>()
            {
                PageIndex = 0,
                PageRecords = records,
                PagesTotal = 1,
                RecordsPerPage = totalRecords,
                RecordsTotal = totalRecords
            };
        }
        public async Task ToggleFreeLancerSelection(int p_vendorId, int p_freelancerId)
        {
            ITrnVendorFreeLancerSelectionRepository customerVendSelectionRepo = this.Provider.GetService<ITrnVendorFreeLancerSelectionRepository>();

            TrnVendorFreeLancerSelection freelancerSelection = await customerVendSelectionRepo.GetByParams(p_vendorId, p_freelancerId);

            if(freelancerSelection != null)
                await customerVendSelectionRepo.RemoveOneAsync(freelancerSelection);
            else
            {
                freelancerSelection = new TrnVendorFreeLancerSelection()
                {
                    VendorId = p_vendorId,
                    FreelancerId = p_freelancerId
                };
                await customerVendSelectionRepo.InsertOneAsync(freelancerSelection);
            }
        }
        public async Task<bool> UpdateFreeLancer(MasterFreeLancer masterVendor)
        {
            try
            {
                var p_vendorId = masterVendor.id;
                List<Expression<Func<MasterFreeLancer, bool>>> filterConditions = new List<Expression<Func<MasterFreeLancer, bool>>>();
                Expression<Func<MasterFreeLancer, bool>> filters = null;

                if (p_vendorId > 0)
                    filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<MasterFreeLancer>(a => a.id, OperationExpression.Equals,
                        p_vendorId));
                if (filterConditions.Count > 0)
                {
                    foreach (Expression<Func<MasterFreeLancer, bool>> filterCondition in filterConditions)
                        filters = (filters == null ? filterCondition : filters.And(filterCondition));
                }
                List<MasterFreeLancer> masterVendors = await this.GetQueryable(filters).ToListAsync();
                await this.GetQueryable(filters).UpdateFromQueryAsync(x => new MasterFreeLancer()
                {
                    Name = masterVendor.Name,
                    TypeId = masterVendor.TypeId,
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
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}