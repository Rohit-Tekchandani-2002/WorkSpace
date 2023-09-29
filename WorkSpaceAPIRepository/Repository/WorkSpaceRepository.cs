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
using WorkSpaceAPIEntites.ViewModels.Common;
using WorkSpaceAPIEntites.ViewModels.WorkSpaceControllerViewModel;
using WorkSpaceAPIRepository.Interface;

namespace WorkSpaceAPIRepository.Repository
{
    public class WorkSpaceRepository : IWorkSpaceRepository
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public string? connectionString { get; private set; }
        public WorkSpaceRepository(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            connectionString = configuration.GetConnectionString("user");
            _httpContextAccessor = httpContextAccessor;
        }
        public IDbConnection Connection
        {
            get { return new SqlConnection(connectionString); }
        }
        public GetMonthlyTimeLogResponce? GetMyMonthlyTimeLogs(GetMonthlyTimeLogRequest request, out HttpStatusCode? statusCode, out string? errorText)
        {
            GetMonthlyTimeLogResponce? projectsResponse = new GetMonthlyTimeLogResponce();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@EmployeeId", request.EmployeeId);
                    param.Add("@Month", request.Month);
                    param.Add("@Year", request.Year);
                    var details = dbConnection.QueryMultiple("SP_GetMyTimeLogs", param, commandType: CommandType.StoredProcedure);
                    projectsResponse.EmployeeInfo = details.Read<EmployeeTimeLogInfo>().FirstOrDefault();
                    projectsResponse.EmployeeMonthlyLogs = details.Read<EmployeeMonthlyLog>().ToList();
                    dbConnection.Close();

                    if (projectsResponse.EmployeeInfo == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found";
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

        public List<EmployeeYearlyLog>? GetMyYearlyTimeLog(GetYearlyTimeLogRequest request, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<EmployeeYearlyLog>? projectsResponse = new List<EmployeeYearlyLog>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@EmployeeId", request.EmployeeId);
                    param.Add("@Year", request.Year);
                    projectsResponse = dbConnection.Query<EmployeeYearlyLog>("SP_GetTimeLogYearly", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found";
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

        public ServiceDropDownResponce? ServiceRequestDropDown(ServiceDropDownRequest request, out HttpStatusCode? statusCode, out string? errorText)
        {
            ServiceDropDownResponce? projectsResponse = new ServiceDropDownResponce();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    projectsResponse.ServiceGroupList = dbConnection.Query<DropDownResponce>("SP_ServiceGroupOfService", commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();
                    
                    if (request.InputServiceGroupId != null)
                    {
                        dbConnection.Open();
                        DynamicParameters param1 = new DynamicParameters();
                        param1.Add("@InputServiceGroupId", request.InputServiceGroupId);
                        projectsResponse.CategoriList = dbConnection.Query<DropDownResponce>("SP_GetCategoriesOfService", param1, commandType: CommandType.StoredProcedure).ToList();
                        dbConnection.Close();
                    }
                    else
                    {
                        projectsResponse.CategoriList = null;
                    }

                    if (request.InputCategoryId != null)
                    {
                        DynamicParameters param2 = new DynamicParameters();
                        param2.Add("@InputCategoryId", request.InputCategoryId);
                        projectsResponse.SubCategoriList = dbConnection.Query<DropDownResponce>("SP_GetSubCategoriesOfService", param2, commandType: CommandType.StoredProcedure).ToList();
                        dbConnection.Close();
                    }
                    else
                    {
                        projectsResponse.SubCategoriList = null;
                    }

                    if (projectsResponse == null)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "No data Found";
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

        public LeaveRequestEmployeeInfoResponce? GetLeaveRequestEmployeeInfo(LeaveRequestEmployeeInfoRequest request, out HttpStatusCode? statusCode, out string? errorText)
        {
            LeaveRequestEmployeeInfoResponce response = new LeaveRequestEmployeeInfoResponce();
            bool isEmployeeExists = true;
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@EmployeeId", request.EmployeeId);
                    param.Add("@StartDate", request.StartDate);
                    param.Add("@EndDate", request.EndDate);
                    param.Add("@EmployeeExists", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    response = dbConnection.QueryFirstOrDefault<LeaveRequestEmployeeInfoResponce>("SP_GetLeaveRequestEmployeeInfo", param, commandType: CommandType.StoredProcedure);
                    isEmployeeExists = param.Get<bool>("@EmployeeExists");
                    dbConnection.Close();

                    if (isEmployeeExists == false)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        errorText = "Employee Not Found";
                        return null;
                    }

                    statusCode = HttpStatusCode.OK;
                    errorText = "Read data successfully!";
                    return response;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in Project repository with Error: " + ex.Message;
                return null;
            }
        }
    }
}
