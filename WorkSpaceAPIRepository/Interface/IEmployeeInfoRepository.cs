using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WorkSpaceAPIEntites.ViewModels.EmployeeInfoControllerViewModel;
using WorkSpaceAPIEntites.ViewModels.ProjectControllerViewModel;

namespace WorkSpaceAPIRepository.Interface
{
    public interface IEmployeeInfoRepository
    {
        EmployeeInfo? GetEmployeeInfo(long employeeId, out System.Net.HttpStatusCode? statusCode, out string? errorText);
        void ChangePassword(ChangePasswordRequest changePasswordRequest, out HttpStatusCode? statusCode, out string? errorText);
        void ChangeNotificationSetting(ChangeNotificationRequest changeNotificationRequest, out HttpStatusCode? statusCode, out string? errorText);
        EmployeePresonalInfo? GetEmployeepersonalInfo(long employeeId, out HttpStatusCode? statusCode, out string? errorText);
        List<CountryVisaInfo>? GetEmployeeTravelInfo(long employeeId, out HttpStatusCode? statusCode, out string? errorText);
        void UpdatePersonalInfo(ChangeEmployeeInfoRequest changeEmployeeInfoRequest, out HttpStatusCode? statusCode, out string? errorText);
        SystemConfiguration? GetSystemConfiguration(long employeeId, out HttpStatusCode? statusCode, out string? errorText);
        void CreateCountryVisaInfo(CreateCountryVisaInfoRequest createCountryVisaInfoRequest, out HttpStatusCode? statusCode, out string? errorText);
        void UpdateCountryVisaInfo(UpdateCountryVisaInfoRequest updateCountryVisaInfoRequest, out HttpStatusCode? statusCode, out string? errorText);
        void DeleteCountryVisaInfo(long visaInfoId, out HttpStatusCode? statusCode, out string? errorText);
        List<GetDropdownDetailResponseModel>? EmployeeNameAndId(out HttpStatusCode? statusCode, out string? errorText);
    }
}
