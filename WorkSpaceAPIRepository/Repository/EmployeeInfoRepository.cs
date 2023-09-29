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
using WorkSpaceAPIEntites.ViewModels.EmployeeInfoControllerViewModel;
using WorkSpaceAPIEntites.ViewModels.ProjectControllerViewModel;
using WorkSpaceAPIRepository.Interface;

namespace WorkSpaceAPIRepository.Repository
{
    public class EmployeeInfoRepository : IEmployeeInfoRepository
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public string? connectionString { get; private set; }
        public EmployeeInfoRepository(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            connectionString = configuration.GetConnectionString("user");
            _httpContextAccessor = httpContextAccessor;
        }
        public IDbConnection Connection
        {
            get { return new SqlConnection(connectionString); }
        }

        public EmployeeInfo? GetEmployeeInfo(long employeeId, out HttpStatusCode? statusCode, out string? errorText)
        {
            EmployeeInfo employeeInfo = new EmployeeInfo();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeId", employeeId);
                    employeeInfo = dbConnection.QueryFirstOrDefault<EmployeeInfo>("SP_ReadEmployeeInfo", param, commandType: CommandType.StoredProcedure);
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

        public void ChangePassword(ChangePasswordRequest changePasswordRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            CommonResponseStatus responseStatus = new CommonResponseStatus();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeId", changePasswordRequest.employeeId);
                    param.Add("@oldPassword", changePasswordRequest.oldpassword);
                    param.Add("@newPassword", changePasswordRequest.newPassword);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_ChangePassword", param, commandType: CommandType.StoredProcedure);
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

        public void ChangeNotificationSetting(ChangeNotificationRequest changeNotificationRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            CommonResponseStatus responseStatus = new CommonResponseStatus();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeId", changeNotificationRequest.employeeId);
                    param.Add("@notificationTypeResolutionChanged", changeNotificationRequest.notificationTypeResolutionChanged);
                    param.Add("@notificationOnAssignedWorkItemChangeByTeamMember", changeNotificationRequest.notificationOnAssignedWorkItemChangeByTeamMember);
                    param.Add("@notificationCommnetOnWork", changeNotificationRequest.notificationCommnetOnWork);
                    param.Add("@notificationAssignedWork", changeNotificationRequest.notificationAssignedWork);
                    param.Add("@notificationDailyAlertEmail", changeNotificationRequest.notificationDailyAlertEmail);
                    param.Add("@notificationOnCreatedWorkItemChangeByTeamMember", changeNotificationRequest.notificationOnCreatedWorkItemChangeByTeamMember);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_ChangeNotificationSetting", param, commandType: CommandType.StoredProcedure);
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

        public EmployeePresonalInfo? GetEmployeepersonalInfo(long employeeId, out HttpStatusCode? statusCode, out string? errorText)
        {
            EmployeePresonalInfo employeeInfo = new EmployeePresonalInfo();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeId", employeeId);
                    employeeInfo = dbConnection.QueryFirstOrDefault<EmployeePresonalInfo>("SP_GetEmployeeDetails", param, commandType: CommandType.StoredProcedure);
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

        public List<CountryVisaInfo>? GetEmployeeTravelInfo(long employeeId, out HttpStatusCode? statusCode, out string? errorText)
        {
            List<CountryVisaInfo>? info = new List<CountryVisaInfo>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeId", employeeId);
                    info = dbConnection.Query<CountryVisaInfo>("SP_GetEmployeeTravells", param, commandType: CommandType.StoredProcedure).ToList();
                    dbConnection.Close();
                    if (info == null)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = "Readed data successfully!";
                    return info;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in AccountsRepository repository with Error: " + ex.Message;
                return null;
            }
        }

        public void UpdatePersonalInfo(ChangeEmployeeInfoRequest changeEmployeeInfoRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            CommonResponseStatus responseStatus = new CommonResponseStatus();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeId", changeEmployeeInfoRequest.employeeId);
                    param.Add("@dateOfBirth", changeEmployeeInfoRequest.dateOfBirth);
                    param.Add("@gender", changeEmployeeInfoRequest.gender);
                    param.Add("@maritalStatus", changeEmployeeInfoRequest.maritalStatus);
                    param.Add("@bloodGroup", changeEmployeeInfoRequest.bloodGroup);
                    param.Add("@anyDisease", changeEmployeeInfoRequest.anyDisease);
                    param.Add("@contactNumber", changeEmployeeInfoRequest.contactNumber);
                    param.Add("@alternateNumber", changeEmployeeInfoRequest.alternateNumber);
                    param.Add("@accountNumber", changeEmployeeInfoRequest.accountNumber);
                    param.Add("@panCardNumber", changeEmployeeInfoRequest.panCardNumber);
                    param.Add("@presentAddress", changeEmployeeInfoRequest.presentAddress);
                    param.Add("@permanentAddress", changeEmployeeInfoRequest.permanentAddress);
                    param.Add("@providentFundNumber", changeEmployeeInfoRequest.providentFundNumber);
                    param.Add("@nsrNumber", changeEmployeeInfoRequest.nsrNumber);
                    param.Add("@companyMail", changeEmployeeInfoRequest.companyMail);
                    param.Add("@personalMail", changeEmployeeInfoRequest.personalMail);
                    param.Add("@messengers", changeEmployeeInfoRequest.messengers);
                    param.Add("@passportNumber", changeEmployeeInfoRequest.passportNumber);
                    param.Add("@dateOfIssue", changeEmployeeInfoRequest.dateOfIssue);
                    param.Add("@placeOfIssue", changeEmployeeInfoRequest.placeOfIssue);
                    param.Add("@nameInPassport", changeEmployeeInfoRequest.nameInPassport);
                    param.Add("@validUpto", changeEmployeeInfoRequest.validUpto);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_UpdateEmployeePersonalDetails", param, commandType: CommandType.StoredProcedure);
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

        public SystemConfiguration? GetSystemConfiguration(long employeeId, out HttpStatusCode? statusCode, out string? errorText)
        {
            SystemConfiguration systemConfiguration = new SystemConfiguration();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeId", employeeId);
                    var details = dbConnection.QueryMultiple("SP_GetUserSystemConfiguration", param, commandType: CommandType.StoredProcedure);
                    systemConfiguration.systemSpecifications = details.ReadFirst<SystemSpecifications>();
                    systemConfiguration.systemItems = details.Read<SystemItems>().ToList();
                    dbConnection.Close();
                    if (details == null)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        errorText = "No data Found, Please try again!";
                        return null;
                    }
                    statusCode = HttpStatusCode.OK;
                    errorText = "Readed data successfully!";
                    return systemConfiguration;
                }
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
                errorText = "Something went wrong in AccountsRepository repository with Error: " + ex.Message;
                return null;
            }
        }

        public void CreateCountryVisaInfo(CreateCountryVisaInfoRequest createCountryVisaInfoRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            CommonResponseStatus responseStatus = new CommonResponseStatus();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@employeeId", createCountryVisaInfoRequest.employeeId);
                    param.Add("@countryName", createCountryVisaInfoRequest.countryName);
                    param.Add("@visaType", createCountryVisaInfoRequest.visaType);
                    param.Add("@visaValidFor", createCountryVisaInfoRequest.visaValidFor);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_CreateEmployeeTravels", param, commandType: CommandType.StoredProcedure);
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

        public void UpdateCountryVisaInfo(UpdateCountryVisaInfoRequest updateCountryVisaInfoRequest, out HttpStatusCode? statusCode, out string? errorText)
        {
            CommonResponseStatus responseStatus = new CommonResponseStatus();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@visaInfoId", updateCountryVisaInfoRequest.visaId);
                    param.Add("@countryName", updateCountryVisaInfoRequest.countryName);
                    param.Add("@visaType", updateCountryVisaInfoRequest.visaType);
                    param.Add("@visaValidFor", updateCountryVisaInfoRequest.visaValidFor);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_UpdateEmployeeTravels", param, commandType: CommandType.StoredProcedure);
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

        public void DeleteCountryVisaInfo(long visaInfoId, out HttpStatusCode? statusCode, out string? errorText)
        {
            CommonResponseStatus responseStatus = new CommonResponseStatus();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@visaInfoId", visaInfoId);
                    param.Add("@status", dbType: DbType.Boolean, direction: ParameterDirection.Output);
                    param.Add("@message", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);
                    dbConnection.Query("SP_DeleteEmployeeTravels", param, commandType: CommandType.StoredProcedure);
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

        public List<GetDropdownDetailResponseModel>? EmployeeNameAndId(out HttpStatusCode? statusCode, out string? errorText)
        {
            List<GetDropdownDetailResponseModel> employeeInfo = new List<GetDropdownDetailResponseModel>();
            try
            {
                using (IDbConnection dbConnection = Connection)
                {
                    dbConnection.Open();
                    DynamicParameters param = new DynamicParameters();
                    employeeInfo = dbConnection.Query<GetDropdownDetailResponseModel>("SELECT E.EmployeeId AS [KeyId], (E.FirstName + ' ' + E.LastName) AS [DataValue] FROM Employee E", commandType: CommandType.Text).ToList();
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
    }
}
