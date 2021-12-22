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
using FrameIncam.Domains.Models.Master.Customer;

namespace FrameIncam.Domains.Repositories.Transaction
{
    public interface ITrnVendorCustomerReviewRepository : IRepository<TrnVendorCustomerReview>
    {
        Task<TrnVendorCustomerReview> GetByParams(int? p_id, string orderId);
        Task<PaginationResults<TrnVendorCustomerReview>> GetReviewsByVendor(int? p_vendorId, int page);
    }

    public class TrnVendorCustomerReviewRepository : Repository<TrnVendorCustomerReview> ,ITrnVendorCustomerReviewRepository
    {
        public TrnVendorCustomerReviewRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }
        public Task<TrnVendorCustomerReview> GetByParams(int? p_id, string orderId)
        {
            throw new NotImplementedException();
        }
        public async Task<PaginationResults<TrnVendorCustomerReview>> GetReviewsByVendor(int? p_vendorId, int page)
        {
            List<Expression<Func<TrnVendorCustomerReview, bool>>> filterConditions = new List<Expression<Func<TrnVendorCustomerReview, bool>>>();
            Expression<Func<TrnVendorCustomerReview, bool>> filters = null;
            var numberOfObjectsPerPage = 5;
            if (p_vendorId.HasValue)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnVendorCustomerReview>(a => a.VendorId, OperationExpression.Equals,
                    p_vendorId));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnVendorCustomerReview, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            var  searchQuery = (from review in this.GetQueryable(filters)
                                join reply in DataContext.TrnVendorCustomerReviewReplay on review.id equals reply.ReviewId into replyDetails
                                from m_reply in replyDetails.DefaultIfEmpty()
                                select new TrnVendorCustomerReview { 
                                    id=review.id,
                                    VendorId=review.VendorId,
                                    Title=review.Title,
                                    Body = review.Body,
                                    Ratings = review.Ratings,
                                    IsShow = review.IsShow,
                                    CreatedDate= review.CreatedDate,
                                    CustomerName= DataContext.MasterCustomer.Where(x=>x.Email==review.CreatedBy).FirstOrDefault().Name,
                                    Reply= ((m_reply != null) ? m_reply.Body : "")
                                });
            searchQuery = searchQuery.OrderByDescending(result => result.CreatedDate);
            var totalRecords = searchQuery.Count();
            var records = await (searchQuery)
                    .Skip(numberOfObjectsPerPage * (page - 1)).Take(numberOfObjectsPerPage)
                    .ToListAsync();
            var totalPages = Math.Ceiling(((decimal)totalRecords) / numberOfObjectsPerPage);
            return new PaginationResults<TrnVendorCustomerReview>()
            {
                PageIndex = page,
                PageRecords = records,
                PagesTotal = (int)totalPages,
                RecordsPerPage = numberOfObjectsPerPage,
                RecordsTotal = totalRecords
            };
        }
    }
}
