using FrameIncam.Domains.Common.Projects;
using FrameIncam.Domains.Extensions;
using FrameIncam.Domains.Models;
using FrameIncam.Domains.Models.Master.Vendor;
using FrameIncam.Domains.Models.Transaction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FrameIncam.Domains.Repositories.Transaction
{
    public interface ITrnProjectFilesRepository : IRepository<TrnProjectFiles>
    {
        Task<int> GetFileCountByProject(int p_projectId);
        Task<TrnProjectFiles> GetDefaultFile(int p_projectId);
        Task<List<TrnProjectFiles>> GetByProject(int p_projectId);
        Task<List<TrnProjectFiles>> GetApprovedByProject(int p_projectId);
        Task<TrnProjectFiles> GetByParamsAsync(int p_projectId, string p_fileName,string p_fileType);
        Task<List<LatestProjectFilesResponse>> GetLatestProjectFiles(int count);
        int? GetThumbnailById(string p_projectFileName);
    }

    public class TrnProjectFilesRepository : Repository<TrnProjectFiles>, ITrnProjectFilesRepository
    {
        public TrnProjectFilesRepository(IServiceProvider p_provider, FrameIncamDbContext p_dataContext) : base(p_provider, p_dataContext)
        {

        }

        public async Task<int> GetFileCountByProject(int p_projectId)
        {
            List<Expression<Func<TrnProjectFiles, bool>>> filterConditions = new List<Expression<Func<TrnProjectFiles, bool>>>();
            Expression<Func<TrnProjectFiles, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.ProjectId, OperationExpression.Equals, p_projectId));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.FileType, OperationExpression.Equals, "image"));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnProjectFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            return await this.CountManyAsync(filters);
        }

        public async Task<TrnProjectFiles> GetDefaultFile(int p_projectId)
        {
            Expression<Func<TrnProjectFiles, bool>> filters =
               Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.ProjectId, OperationExpression.Equals, p_projectId);

            return await this.GetOneAsync(filters);
        }

        public async Task<List<TrnProjectFiles>> GetByProject(int p_projectId)
        {
            List<Expression<Func<TrnProjectFiles, bool>>> filterConditions = new List<Expression<Func<TrnProjectFiles, bool>>>();
            Expression<Func<TrnProjectFiles, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.ProjectId, OperationExpression.Equals, p_projectId));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.FileType, OperationExpression.Equals, "image"));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnProjectFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetManyAsync(filters);
        }

        public async Task<List<TrnProjectFiles>> GetApprovedByProject(int p_projectId)
        {
            List<Expression<Func<TrnProjectFiles, bool>>> filterConditions = new List<Expression<Func<TrnProjectFiles, bool>>>();
            Expression<Func<TrnProjectFiles, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.ProjectId, OperationExpression.Equals, p_projectId));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.IsApproved, OperationExpression.Equals, 1)); 
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.FileType, OperationExpression.Equals, "image"));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnProjectFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetManyAsync(filters);
        }

        public async Task<TrnProjectFiles> GetByParamsAsync(int p_projectId, string p_fileName,string p_fileType="image")
        {
            List<Expression<Func<TrnProjectFiles, bool>>> filterConditions = new List<Expression<Func<TrnProjectFiles, bool>>>();
            Expression<Func<TrnProjectFiles, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.ProjectId, OperationExpression.Equals, p_projectId));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.FileName, OperationExpression.Equals,p_fileName));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.FileType, OperationExpression.Equals, p_fileType));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnProjectFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            if (filters == null)
                return default;

            return await this.GetOneAsync(filters);
        }
        public async Task<List<LatestProjectFilesResponse>> GetLatestProjectFiles(int count)
        {
            List<Expression<Func<TrnProjectFiles, bool>>> filterConditions = new List<Expression<Func<TrnProjectFiles, bool>>>();
            Expression<Func<TrnProjectFiles, bool>> filters = null;
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.IsApproved, OperationExpression.Equals, 1));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.FileType, OperationExpression.Equals, "image"));

            if (filterConditions.Count > 0)
            {
                foreach(Expression<Func<TrnProjectFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }

            FilterOptions filterOptions = new FilterOptions();
            filterOptions.Limit = count;
            Expression<Func<TrnProjectFiles, object>> orderByFunc = o => o.CreatedDate;
            var query = this.GetQueryable(filters, filterOptions, orderByFunc,"desc");
            var searchQuery = (from f in query
                               join project in DataContext.TrnProject on f.ProjectId equals project.id
                               join photographer in DataContext.MasterVendor on project.VendorId equals photographer.id
                               select new LatestProjectFilesResponse() {
                                   Id = f.id,
                                   PhotographerName=photographer.Name,
                                   projectIdentifier=project.Identifier,
                               });
            return searchQuery.ToList();
        }

        public int? GetThumbnailById(string p_projectFileName)
        {
            List<Expression<Func<TrnProjectFiles, bool>>> filterConditions = new List<Expression<Func<TrnProjectFiles, bool>>>();
            Expression<Func<TrnProjectFiles, bool>> filters = null;

            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.FileName, OperationExpression.Equals, p_projectFileName));
            filterConditions.Add(Extensions.ExpressionHelper.GetCriteriaWhere<TrnProjectFiles>(a => a.FileType, OperationExpression.Equals, "thumbnail"));

            if (filterConditions.Count > 0)
            {
                foreach (Expression<Func<TrnProjectFiles, bool>> filterCondition in filterConditions)
                    filters = (filters == null ? filterCondition : filters.And(filterCondition));
            }
            TrnProjectFiles projectFiles = this.GetQueryable(filters).FirstOrDefault();
            if (projectFiles != null)
                return projectFiles.id;
            return null;
        }
    }
}