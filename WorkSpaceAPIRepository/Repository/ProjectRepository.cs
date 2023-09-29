using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WorkSpaceAPIEntites.ViewModels.AttendanceControllerViewModel;
using WorkSpaceAPIEntites.ViewModels.Common;
using WorkSpaceAPIEntites.ViewModels.ProjectControllerViewModel;
using WorkSpaceAPIRepository.Interface;

namespace WorkSpaceAPIRepository.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public string? connectionString { get; private set; }
        public ProjectRepository(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            connectionString = configuration.GetConnectionString("user");
            _httpContextAccessor = httpContextAccessor;
        }
        public IDbConnection Connection
        {
            get { return new SqlConnection(connectionString); }
        }
        public GetProjectsResponse? GetProjects(GetProjectsRequest getProjectsRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            GetProjectsResponse? projectsResponse = new GetProjectsResponse();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@EmployeeId", getProjectsRequest.EmployeeId);
                    param.Add("@ProjectStatus", getProjectsRequest.ProjectStatus);
                    param.Add("@ProjectName", getProjectsRequest.ProjectName);
                    param.Add("@ProjectType", getProjectsRequest.ProjectType);
                    param.Add("@ProjectTechId", getProjectsRequest.ProjectTechId);
                    param.Add("@PageNumber", getProjectsRequest.PageNumber);
                    param.Add("@PageSize", getProjectsRequest.PageSize);
                    param.Add("@Expression", getProjectsRequest.Expression);
                    param.Add("@IsSortByAsc", getProjectsRequest.IsSortByAsc);
                    param.Add("@TotalProjectCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    var details = dbConnection.QueryMultiple("SP_GetProjects", param, commandType: CommandType.StoredProcedure);
                    projectsResponse.Projects = details.Read<Project>()?.ToList();
                    projectsResponse.TotalProjects = param.Get<int>("@TotalProjectCount");
                    dbConnection.Close();

                    if (projectsResponse.Projects == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in Project repository with Error: " + ex.Message;
                return null;
            }
        }

        public List<WorkGroupDetails>? GetWorkGroups(long projectId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<WorkGroupDetails>? projectsResponse = new List<WorkGroupDetails>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@projectId", projectId);
                    projectsResponse = dbConnection.Query<WorkGroupDetails>("SP_GetWorkGroupDetails", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in Accounts repository with Error: " + ex.Message;
                return null;
            }
        }

        public List<ProjectStatusCount>? GetProjectStatusCount(long projectId, long? workGroupId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<ProjectStatusCount>? projectsResponse = new List<ProjectStatusCount>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@projectId", projectId);
                    param.Add("@WorkGroupId", workGroupId);
                    projectsResponse = dbConnection.Query<ProjectStatusCount>("SP_GetStatusCountsInProject", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public List<GetDropdownDetailResponseModel>? GetAllWorkGroup(long projectId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<GetDropdownDetailResponseModel>? projectsResponse = new List<GetDropdownDetailResponseModel>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@projectId", projectId);
                    projectsResponse = dbConnection.Query<GetDropdownDetailResponseModel>("SELECT WG.WorkGroupId AS KeyId, WG.WorkGroupName AS DataValue FROM [WorkGroup] WG WHERE WG.[ProjectId] = @projectId;", param, commandType: CommandType.Text).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public GetProjectBackLogResponce? GetProjectBackLog(GetProjectBackLogRequest getProjectBackLogRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            GetProjectBackLogResponce? projectsResponse = new GetProjectBackLogResponce();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", getProjectBackLogRequest.ProjectId);
                    param.Add("@SearchText", getProjectBackLogRequest.SearchText);
                    param.Add("@WorkGroupId", getProjectBackLogRequest.WorkGroupId);
                    param.Add("@AssignedPersonId", getProjectBackLogRequest.AssignedPersonId);
                    param.Add("@ReportedPersonId", getProjectBackLogRequest.ReportedPersonId);
                    param.Add("@ProjectType", getProjectBackLogRequest.ProjectType);
                    param.Add("@ProjectStatus", getProjectBackLogRequest.ProjectStatus);
                    param.Add("@StartDate", getProjectBackLogRequest.StartDate);
                    param.Add("@EndDate", getProjectBackLogRequest.EndDate);
                    param.Add("@Priority", getProjectBackLogRequest.Priority);
                    param.Add("@PageNumber", getProjectBackLogRequest.PageNumber);
                    param.Add("@PageSize", getProjectBackLogRequest.PageSize);
                    param.Add("@Expression", getProjectBackLogRequest.Expression);
                    param.Add("@IsSortByAsc", getProjectBackLogRequest.IsSortByAsc);
                    param.Add("@TotalProjectCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    var details = dbConnection.QueryMultiple("SP_ProductBacklog", param, commandType: CommandType.StoredProcedure);
                    projectsResponse.ProjectBackLogs = details.Read<ProjectBackLog>()?.ToList();
                    projectsResponse.TotalProjectBacklogs = param.Get<int>("@TotalProjectCount");
                    dbConnection.Close();

                    if (projectsResponse.ProjectBackLogs == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public List<WorkBacklog>? GetWorkLog(GetWorkBackLogRequest request, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<WorkBacklog>? projectsResponse = new List<WorkBacklog>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@WorkGroupId", request.WorkGroupId);
                    param.Add("@SearchText", request.SearchText);
                    param.Add("@ProjectType", request.ProjectType);
                    param.Add("@ProjectStatus", request.ProjectStatus);
                    param.Add("@AssignedPersonId", request.AssignedPersonId);
                    param.Add("@Expression", request.Expression);
                    param.Add("@IsSortByAsc", request.IsSortByAsc);
                    projectsResponse = dbConnection.Query<WorkBacklog>("SP_GetWorkBackLog", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public void AddWorkItem(AddWorkItemRequest registerRequest, out HttpStatusCode? statusCode, out string? errorText, out long? generatedId)
        {
            generatedId = null;
            try
            {
                CommonResponseStatus responseStatus = new CommonResponseStatus();
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@EmployeeId", registerRequest.EmployeeId);
                    param.Add("@ProjectId", registerRequest.ProjectId);
                    param.Add("@SubProjectId", registerRequest.SubProjectId);
                    param.Add("@Title", registerRequest.Title);
                    param.Add("@WorkGroupId", registerRequest.WorkGroupId);
                    param.Add("@WorkFlow", registerRequest.WorkFlow);
                    param.Add("@Priority", registerRequest.Priority);
                    param.Add("@ProjectStatusId", registerRequest.ProjectStatusId);
                    param.Add("@StartDate", registerRequest.StartDate);
                    param.Add("@EndDate", registerRequest.EndDate);
                    param.Add("@OriginalEstTime", registerRequest.OriginalEstTime);
                    param.Add("@RemaningEstTime", registerRequest.RemainingEstTime);
                    param.Add("@AssignedEmployeeId", registerRequest.AssignedEmployeeId);
                    param.Add("@ReportedEmployeeId", registerRequest.ReportedEmployeeId);
                    param.Add("@ReleasedToProduction", registerRequest.ReleasedToProduction);
                    param.Add("@RSI", registerRequest.RSI);
                    param.Add("@Description", registerRequest.Description);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    param.Add("@GeneratedID", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_AddWorkItem", param, commandType: CommandType.StoredProcedure);
                    responseStatus.Success = param.Get<bool>("@status");
                    responseStatus.Message = param.Get<string>("@message");
                    var temp = param.Get<string>("@GeneratedID");
                    if (temp != string.Empty && temp != null)
                    {
                        generatedId = Convert.ToInt64(temp);
                    }
                    dbConnection.Close();
                    if (responseStatus.Success == false)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = responseStatus.Message;
                        return;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = responseStatus.Message;
                    return;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
            }
        }

        public ProjectWorkItemResponce? GetProjectWorkItem(long projectWorkId, out HttpStatusCode? statusCode, out string? errorText)
        {
            ProjectWorkItemResponce? projectsResponse = new ProjectWorkItemResponce();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectWorkId", projectWorkId);
                    projectsResponse = dbConnection.QueryFirst<ProjectWorkItemResponce>("SP_GetProjectWorkItem", param, commandType: CommandType.StoredProcedure);
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public void UpdateWorkItem(UpdateWorkItemRequest updateWorkItemRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            CommonResponseStatus responseStatus = new CommonResponseStatus();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectWorkId", updateWorkItemRequest.ProjectWorkId);
                    param.Add("@ProjectId", updateWorkItemRequest.ProjectId);
                    param.Add("@EmployeeId", updateWorkItemRequest.EmployeeId);
                    param.Add("@SubProjectId", updateWorkItemRequest.SubProjectId);
                    param.Add("@Title", updateWorkItemRequest.Title);
                    param.Add("@WorkGroupId", updateWorkItemRequest.WorkGroupId);
                    param.Add("@WorkFlow", updateWorkItemRequest.WorkFlow);
                    param.Add("@Priority", updateWorkItemRequest.Priority);
                    param.Add("@ProjectStatusId", updateWorkItemRequest.ProjectStatusId);
                    param.Add("@StartDate", updateWorkItemRequest.StartDate);
                    param.Add("@EndDate", updateWorkItemRequest.EndDate);
                    param.Add("@OriginalEstTime", updateWorkItemRequest.OriginalEstTime);
                    param.Add("@RemainingEstTime", updateWorkItemRequest.RemainingEstTime);
                    param.Add("@AssignedEmployeeId", updateWorkItemRequest.AssignedEmployeeId);
                    param.Add("@ReportedEmployeeId", updateWorkItemRequest.ReportedEmployeeId);
                    param.Add("@ReleasedToProduction", updateWorkItemRequest.ReleasedToProduction);
                    param.Add("@RSI", updateWorkItemRequest.RSI);
                    param.Add("@Description", updateWorkItemRequest.Description);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_UpdateWorkItem", param, commandType: CommandType.StoredProcedure);
                    responseStatus.Success = param.Get<bool>("@status");
                    responseStatus.Message = param.Get<string>("@message");
                    dbConnection.Close();
                    if (responseStatus.Success == false)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = responseStatus.Message;
                        return;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = responseStatus.Message;
                    return;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in EmployeeInfoRepository repository with Error: " + ex.Message;
                return;
            }
        }

        public List<GetDropdownDetailResponseModel>? GetAllWorkGroupEmployee(long projectId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<GetDropdownDetailResponseModel>? projectsResponse = new List<GetDropdownDetailResponseModel>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", projectId);
                    projectsResponse = dbConnection.Query<GetDropdownDetailResponseModel>("SP_GetAllWorkGroupEmployee", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public List<GetDropdownDetailResponseModel>? GetAllWorkGroupSubProject(long projectId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<GetDropdownDetailResponseModel>? projectsResponse = new List<GetDropdownDetailResponseModel>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", projectId);
                    projectsResponse = dbConnection.Query<GetDropdownDetailResponseModel>("SP_GetAllWorkGroupSubProject", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public void AddWorkLog(AddWorkLogRequest addWorkLogRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            try
            {
                CommonResponseStatus responseStatus = new CommonResponseStatus();
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectWorkId", addWorkLogRequest.ProjectWorkId);
                    param.Add("@WorkDoneOn", addWorkLogRequest.WorkDoneOn);
                    param.Add("@WorkTime", addWorkLogRequest.WorkTime);
                    param.Add("@Description", addWorkLogRequest.Description);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_AddWorkLog", param, commandType: CommandType.StoredProcedure);
                    responseStatus.Success = param.Get<bool>("@status");
                    responseStatus.Message = param.Get<string>("@message");
                    dbConnection.Close();
                    if (responseStatus.Success == false)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = responseStatus.Message;
                        return;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = responseStatus.Message;
                    return;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
            }
        }

        public void UpdateWorkLog(UpdateWorklogRequest updateWorkLogRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            try
            {
                CommonResponseStatus responseStatus = new CommonResponseStatus();
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@WorkLogId", updateWorkLogRequest.WorkLogId);
                    param.Add("@WorkDoneOn", updateWorkLogRequest.WorkDoneOn);
                    param.Add("@WorkTime", updateWorkLogRequest.WorkTime);
                    param.Add("@Description", updateWorkLogRequest.Description);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_UpdateWorkLog", param, commandType: CommandType.StoredProcedure);
                    responseStatus.Success = param.Get<bool>("@status");
                    responseStatus.Message = param.Get<string>("@message");
                    dbConnection.Close();
                    if (responseStatus.Success == false)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = responseStatus.Message;
                        return;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = responseStatus.Message;
                    return;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
            }
        }

        public List<Worklogs>? GetWorkLogs(long projectWorkId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<Worklogs>? projectsResponse = new List<Worklogs>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectWorkId", projectWorkId);
                    projectsResponse = dbConnection.Query<Worklogs>("SP_GetWorkLogs", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public void DeleteWorkLog(long workLogId, out HttpStatusCode? statusCode, out string? errorText)
        {
            CommonResponseStatus responseStatus = new CommonResponseStatus();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@WorkLogId", workLogId);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_DeleteWorkLog", param, commandType: CommandType.StoredProcedure);
                    responseStatus.Success = param.Get<bool>("@status");
                    responseStatus.Message = param.Get<string>("@message");
                    dbConnection.Close();
                    if (responseStatus.Success == false)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = responseStatus.Message;
                        return;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = responseStatus.Message;
                    return;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return;
            }
        }

        public void AddWorkItemComment(AddWorkItemCommentRequest addWorkItemCommentRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            try
            {
                CommonResponseStatus responseStatus = new CommonResponseStatus();
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectWorkId", addWorkItemCommentRequest.ProjectWorkId);
                    param.Add("@EmployeeId", addWorkItemCommentRequest.EmployeeId);
                    param.Add("@Comments", addWorkItemCommentRequest.Comments);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_AddWorkItemComment", param, commandType: CommandType.StoredProcedure);
                    responseStatus.Success = param.Get<bool>("@status");
                    responseStatus.Message = param.Get<string>("@message");
                    dbConnection.Close();
                    if (responseStatus.Success == false)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = responseStatus.Message;
                        return;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = responseStatus.Message;
                    return;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
            }
        }

        public List<WorkComments>? GetWorkItemComments(long projectWorkId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<WorkComments>? projectsResponse = new List<WorkComments>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectWorkId", projectWorkId);
                    projectsResponse = dbConnection.Query<WorkComments>("SP_GetWorkItemComments", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public void DeleteWorkItemComments(long workItemCommentId, out HttpStatusCode? statusCode, out string? errorText)
        {
            CommonResponseStatus responseStatus = new CommonResponseStatus();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@WorkItemCommentId", workItemCommentId);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_DeleteWorkItemComments", param, commandType: CommandType.StoredProcedure);
                    responseStatus.Success = param.Get<bool>("@status");
                    responseStatus.Message = param.Get<string>("@message");
                    dbConnection.Close();
                    if (responseStatus.Success == false)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = responseStatus.Message;
                        return;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = responseStatus.Message;
                    return;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return;
            }
        }

        public List<WorkState>? GetWorkItemState(long projectWorkId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<WorkState>? projectsResponse = new List<WorkState>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectWorkId", projectWorkId);
                    projectsResponse = dbConnection.Query<WorkState>("SP_GetWorkItemState", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public void AddWorkItemAttachment(AddWorkItemAttachmentRequest addWorkItemAttachmentRequest, string? filename, string? filePath, string? fileType, out HttpStatusCode? statusCode, out string? errorText)
        {
            try
            {
                CommonResponseStatus responseStatus = new CommonResponseStatus();
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectWorkId", addWorkItemAttachmentRequest.ProjectWorkId);
                    param.Add("@FileName", filename);
                    param.Add("@FilePath", filePath);
                    param.Add("@Description", addWorkItemAttachmentRequest.Description);
                    param.Add("@filetype", fileType);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_AddWorkItemAttachment", param, commandType: CommandType.StoredProcedure);
                    responseStatus.Success = param.Get<bool>("@status");
                    responseStatus.Message = param.Get<string>("@message");
                    dbConnection.Close();
                    if (responseStatus.Success == false)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = responseStatus.Message;
                        return;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = responseStatus.Message;
                    return;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
            }
        }

        public List<WorkItemAttachment>? GetWorkItemAttachments(long projectWorkId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<WorkItemAttachment>? projectsResponse = new List<WorkItemAttachment>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectWorkId", projectWorkId);
                    projectsResponse = dbConnection.Query<WorkItemAttachment>("SP_GetWorkItemAttachments", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public void DeleteWorkItemAttachment(long workItemAttachmentsId, out HttpStatusCode? statusCode, out string? errorText)
        {
            CommonResponseStatus responseStatus = new CommonResponseStatus();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@WorkItemAttachmentsId", workItemAttachmentsId);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_DeleteWorkItemAttachment", param, commandType: CommandType.StoredProcedure);
                    responseStatus.Success = param.Get<bool>("@status");
                    responseStatus.Message = param.Get<string>("@message");
                    dbConnection.Close();
                    if (responseStatus.Success == false)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = responseStatus.Message;
                        return;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = responseStatus.Message;
                    return;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return;
            }
        }

        public GetWorkItemHistory? GetWorkItemHistory(GetWorkItemHistoryRequest getWorkItemHistoryRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            GetWorkItemHistory? projectsResponse = new GetWorkItemHistory();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@WorkItemId", getWorkItemHistoryRequest.WorkItemId);
                    param.Add("@PageNumber", getWorkItemHistoryRequest.PageNumber);
                    param.Add("@PageSize", getWorkItemHistoryRequest.PageSize);
                    param.Add("@Expression", getWorkItemHistoryRequest.Expression);
                    param.Add("@IsSortByAsc", getWorkItemHistoryRequest.IsSortByAsc);
                    param.Add("@TotalProjectCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    var details = dbConnection.QueryMultiple("SP_GetWorkItemHistory", param, commandType: CommandType.StoredProcedure);
                    projectsResponse.WorkItemHistorys = details.Read<WorkItemHistory>()?.ToList();
                    projectsResponse.TotalProjectCount = param.Get<int>("@TotalProjectCount");
                    dbConnection.Close();

                    if (projectsResponse.WorkItemHistorys == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository repository with Error: " + ex.Message;
                return null;
            }
        }

        public List<GetDropdownDetailResponseModel>? GetProjectTech(out HttpStatusCode? statusCode, out string? errorText)
        {
            List<GetDropdownDetailResponseModel>? projectsResponse = new List<GetDropdownDetailResponseModel>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    projectsResponse = dbConnection.Query<GetDropdownDetailResponseModel>("SELECT [ProjectTechId] AS [KeyId], [ProjectTechName] AS [DataValue] FROM [WorkSpaceDb].[dbo].[ProjectTech];", commandType: CommandType.Text).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in project repository with Error: " + ex.Message;
                return null;
            }
        }

        public WorkGroupDetails? GetWorkGroupFromId(long workGroupId, out HttpStatusCode? statusCode, out string? errorText)
        {
            try
            {
                WorkGroupDetails? projectsResponse = new WorkGroupDetails();
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@WorkGroupId", workGroupId);
                    projectsResponse = dbConnection.QueryFirstOrDefault<WorkGroupDetails>("SP_GetWorkGroupFromId", param, commandType: CommandType.StoredProcedure);
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in project repository with Error: " + ex.Message;
                return null;
            }
        }

        public void UpdateProjectWorkItemTime(UpdateProjectWorkItemTimeRequest updateProjectWorkItemTimeRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            try
            {
                CommonResponseStatus responseStatus = new CommonResponseStatus();
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectWorkId", updateProjectWorkItemTimeRequest.ProjectWorkId);
                    param.Add("@TotalTime", updateProjectWorkItemTimeRequest.TotalTime);
                    param.Add("@RemaningTime", updateProjectWorkItemTimeRequest.RemaningTime);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_UpdateProjectWorkItemTime", param, commandType: CommandType.StoredProcedure);
                    responseStatus.Success = param.Get<bool>("@status");
                    responseStatus.Message = param.Get<string>("@message");
                    dbConnection.Close();
                    if (responseStatus.Success == false)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = responseStatus.Message;
                        return;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = responseStatus.Message;
                    return;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository repository with Error: " + ex.Message;
            }
        }

        public List<ProjectTeamRosterResponce>? GetProjectTeamRosterDetail(long projectId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<ProjectTeamRosterResponce>? projectsResponse = new List<ProjectTeamRosterResponce>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", projectId);
                    projectsResponse = dbConnection.Query<ProjectTeamRosterResponce>("SP_ProjectTeamRosterDetail", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository repository with Error: " + ex.Message;
                return null;
            }
        }

        public List<ProjectActivityStreamResponce>? GetProjectActivityStreamRequest(GetProjectActivityStreamRequest request, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<ProjectActivityStreamResponce>? projectsResponse = new List<ProjectActivityStreamResponce>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@EmployeeId", request.EmployeeId);
                    param.Add("@NumberOfClicks", request.NumberOfClicks);
                    projectsResponse = dbConnection.Query<ProjectActivityStreamResponce>("SP_GetProjectActivityStream", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository repository with Error: " + ex.Message;
                return null;
            }
        }

        public GetWorkGroupLogWithPaginationResponce? GetWorkGroupLogWithPagination(GetWorkGroupLogWithPaginationRequest request, out HttpStatusCode? statusCode, out string? errorText)
        {
            GetWorkGroupLogWithPaginationResponce? projectsResponse = new GetWorkGroupLogWithPaginationResponce();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@WorkGroupId", request.WorkGroupId);
                    param.Add("@PageNumber", request.PageNumber);
                    param.Add("@PageSize", request.PageSize);
                    param.Add("@Expression", request.Expression);
                    param.Add("@IsSortByAsc", request.IsSortByAsc);
                    param.Add("@TotalProjectCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    var details = dbConnection.QueryMultiple("SP_GetWorkGroupLogWithPagination", param, commandType: CommandType.StoredProcedure);
                    projectsResponse.ProjectWorkLogs = details.Read<ProjectWorkLog>()?.ToList();
                    projectsResponse.TotalProjectBacklogs = param.Get<int>("@TotalProjectCount");
                    dbConnection.Close();

                    if (projectsResponse.ProjectWorkLogs == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public Object? GetTimeSheet(GetMytimeSheetRequest request, out HttpStatusCode? statusCode, out string? errorText)
        {
            Object? projectsResponse = new Object();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@EmployeeId", request.EmployeeId);
                    param.Add("@Month", request.Month);
                    param.Add("@Year", request.Year);
                    var results = dbConnection.Query<dynamic>("SP_GetMyTimesheet", param, commandType: CommandType.StoredProcedure);
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    projectsResponse = results;
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }

        public GetTimeSheetResponce? GetTimeSheetDailyTimeLogEmployeeAndDate(GetMytimeSheetRequest request, out HttpStatusCode? statusCode, out string? errorText)
        {
            GetTimeSheetResponce? projectsResponse = new GetTimeSheetResponce();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeid", request.EmployeeId);
                    param.Add("@month", request.Month);
                    param.Add("@year", request.Year);
                    var details = dbConnection.QueryMultiple("SP_GetTimeSheetDailyTimeLogEmployeeAndDate", param, commandType: CommandType.StoredProcedure);
                    projectsResponse.workList = details.Read<GetTimeSheetWorkLogDateResponce>()?.ToList();
                    projectsResponse.timeList = details.Read<GetTimeSheetTimeLogDateResponce>()?.ToList();
                    dbConnection.Close();

                    if (projectsResponse.timeList == null && projectsResponse.workList == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in Project repository with Error: " + ex.Message;
                return null;
            }
        }

        public List<WorkBacklog>? GetWorkBackLogFromProjectId(GetWorkBackLogFromProjectIdRequest request, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<WorkBacklog>? projectsResponse = new List<WorkBacklog>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@ProjectId", request.ProjectId);
                    param.Add("@AssignedPersonId", request.AssignedPersonId);
                    param.Add("@Expression", request.Expression);
                    param.Add("@IsSortByAsc", request.IsSortByAsc);
                    projectsResponse = dbConnection.Query<WorkBacklog>("SP_GetWorkBackLogFromProjectId", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return projectsResponse;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in ProjectRepository with Error: " + ex.Message;
                return null;
            }
        }
    }
}