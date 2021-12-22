using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Subscription;
using FrameIncam.Domains.Models.Transaction;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using System.Linq.Expressions;
using FrameIncam.Domains.Extensions;

namespace FrameIncam.Domains.Repositories.Transaction
{
    public interface ITrnVendorCustomerReviewReplayRepository : IRepository<TrnVendorCustomerReviewReplay>
    {
        Task<TrnVendorCustomerReview> GetByParams(int? p_id, string orderId);
    }
    public class TrnVendorCustomerReviewReplayRepository : Repository<TrnVendorCustomerReviewReplay>, ITrnVendorCustomerReviewReplayRepository
    {
        public TrnVendorCustomerReviewReplayRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }
        public Task<TrnVendorCustomerReview> GetByParams(int? p_id, string orderId)
        {
            throw new NotImplementedException();
        }
    }
}
