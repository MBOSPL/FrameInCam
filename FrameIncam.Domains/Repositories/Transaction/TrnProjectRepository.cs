using FrameIncam.Domains.Common.Projects;
using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.FreeLancer;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Models.Transaction;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Transaction
{
    public interface ITrnProjectRepository : IRepository<TrnProject>
    {
        Task<TrnProject> GetByParams(int? p_id, int? p_code);
        Task<TrnProject> GetByIdentifier(string p_identifier);
        Task<List<TrnProject>> GetByVendor(int p_vendorId,string projectType,int? p_userId);
        Task<List<TrnProject>> GetByCustomer(int p_customerId);
        Task<List<TrnProject>> GetByFreeLancer(int p_freelancerId,string projectType);
        Task<bool> AssignProject(TrnProject trnProject, MasterFreeLancer masterFreeLancer);
        Task<bool> IsExistAsync(string p_name, int? p_projectId);
    }

    public class TrnProjectRepository : Repository<TrnProject>, ITrnProjectRepository
    {
        public TrnProjectRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        public async Task<TrnProject> GetByParams(int? p_id, int? p_code)
        {
            List<Expression<Func<TrnProject, bool>>> filterConditions = new List<Expression<Func<TrnProject, bool>>>();
            Expression<Func<TrnProject, bool>> filters = null;

            if (p_id.HasValue && p_id > 0)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.id, OperationExpression.Equals, p_id.Value));

            if (p_code.HasValue && p_code> 0)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.Code, OperationExpression.Equals, p_code.Value));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnProject, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetOneAsync(filters);
        }

        public async Task<TrnProject> GetByIdentifier(string p_identifier)
        {
            Expression<Func<TrnProject, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.Identifier, OperationExpression.Equals, p_identifier);

            return await this.GetOneAsync(filters);
        }

        public async Task<List<TrnProject>> GetByVendor(int p_vendorId,string projectType,int? p_userId=0)
        {
            List<Expression<Func<TrnProject, bool>>> filterConditions = new List<Expression<Func<TrnProject, bool>>>();
            List<Expression<Func<TrnProject, bool>>> filterConditionsOR = new List<Expression<Func<TrnProject, bool>>>();
            Expression<Func<TrnProject, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.VendorId, OperationExpression.Equals, p_vendorId));
            if (projectType == "owned")
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.Photographer, OperationExpression.Equals, 0));
            else if (projectType == "assigned")
            {
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.Photographer, OperationExpression.NotEquals, 0));
                filterConditionsOR.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.Photographer, OperationExpression.Equals, p_userId));
            }
            else
            {
                filterConditionsOR.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.Photographer, OperationExpression.Equals, p_userId));
            }
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnProject, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            if (filterConditionsOR.Count > 0)
            {
                foreach (Expression<Func<TrnProject, bool>> filterCondition in filterConditionsOR)
                    filters = (filters == null ? filterCondition : filters.Or(filterCondition));
            }
            return await this.GetManyAsync(filters);
        }

        public async Task<List<TrnProject>> GetByCustomer(int p_customerId)
        {
            Expression<Func<TrnProject, bool>> filters =
                Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.CustomerId, OperationExpression.Equals, p_customerId);

            return await this.GetManyAsync(filters);
        }

        public async Task<bool> IsExistAsync(string p_name, int? p_projectId)
        {
            List<Expression<Func<TrnProject, bool>>> filterConditions = new List<Expression<Func<TrnProject, bool>>>();
            Expression<Func<TrnProject, bool>> filters = null;

            if (!string.IsNullOrEmpty(p_name))
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.ProjectName, OperationExpression.Equals, p_name));

            if (p_projectId.HasValue && p_projectId.Value > 0)
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.id, OperationExpression.NotEquals, p_projectId.Value));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnProject, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return false;

            int projectCount = await this.CountManyAsync(filters);
            return projectCount > 0;
        }

        public async Task<List<TrnProject>> GetByFreeLancer(int p_freelancerId,string projectType)
        {
            List<Expression<Func<TrnProject, bool>>> filterConditions = new List<Expression<Func<TrnProject, bool>>>();
            Expression<Func<TrnProject, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.Photographer, OperationExpression.Equals, p_freelancerId));
            if (projectType == "upcoming")
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.Status, OperationExpression.Equals, "New"));
            else if (projectType == "completed")
                filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.Status, OperationExpression.NotEquals, "New"));
            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnProject, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            return await this.GetManyAsync(filters);
        }

        public async Task<bool> AssignProject(TrnProject trnProject, MasterFreeLancer masterFreeLancer)
        {
            bool updateFlag = false;
            try
            {
                var p_projectId = trnProject.id;
                List<Expression<Func<TrnProject, bool>>> filterConditions = new List<Expression<Func<TrnProject, bool>>>();
                Expression<Func<TrnProject, bool>> filters = null;

                if (p_projectId > 0)
                    filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProject>(a => a.id, OperationExpression.Equals,
                        p_projectId));
                if (filterConditions.Count > 0)
                {
                    foreach (Expression<Func<TrnProject, bool>> filterCondition in filterConditions)
                        filters = (filters == null ? filterCondition : filters.And(filterCondition));
                }
                await this.GetQueryable(filters).UpdateFromQueryAsync(x => new TrnProject()
                {
                    Photographer = masterFreeLancer.id
                });
                updateFlag= true;
            }
            catch (Exception e)
            {
                updateFlag= false;
            }
            return updateFlag;
        }
    }
}