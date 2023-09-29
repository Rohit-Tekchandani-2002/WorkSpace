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
using WorkSpaceAPIEntites.ViewModels.DashBoardControllerViewModel;
using WorkSpaceAPIRepository.Interface;

namespace WorkSpaceAPIRepository.Repository
{
    public class DashBoardRepository : IDashBoardRepository
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public string? connectionString { get; private set; }
        public DashBoardRepository(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            connectionString = configuration.GetConnectionString("user");
            _httpContextAccessor = httpContextAccessor;
        }
        public IDbConnection Connection
        {
            get { return new SqlConnection(connectionString); }
        }
        
        public EmployeeForDashBoard? GetEmployeeInfo(long employeeId, out HttpStatusCode? statusCode, out string? errorText)
        {
            EmployeeForDashBoard? employeeInfo = new EmployeeForDashBoard();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeId", employeeId);
                    employeeInfo = dbConnection.QueryFirstOrDefault<EmployeeForDashBoard>("SP_GetUserForDashboard", param, commandType: CommandType.StoredProcedure);
                    dbConnection.Close();
                    if (employeeInfo == null)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = "Readed data successfully!";
                    return employeeInfo;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in AccountsRepository repository with Error: " + ex.Message;
                return null;
            }
        }

        public List<UserProjects>? GetUserProjects(long employeeId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<UserProjects>? userProjects = new List<UserProjects>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeId", employeeId);
                    userProjects = dbConnection.Query<UserProjects>("SP_GetUserProjects", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();
                    if (userProjects == null)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = "Readed data successfully!";
                    return userProjects;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in AccountsRepository repository with Error: " + ex.Message;
                return null;
            }
        }

        public List<NewsAndUpdates>? GetnewsAndUpdates(out HttpStatusCode? statusCode, out string? errorText)
        {
            List<NewsAndUpdates>? newsAndUpdates = new List<NewsAndUpdates>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    //param.Add("@employeeId", employeeId);
                    newsAndUpdates = dbConnection.Query<NewsAndUpdates>("SP_GetNewsAndDetails", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();
                    if (newsAndUpdates == null)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = "Readed data successfully!";
                    return newsAndUpdates;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in AccountsRepository repository with Error: " + ex.Message;
                return null;
            }
        }
    }
}
