using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WorkSpaceAPIEntites.ViewModels.WorkSpaceControllerViewModel;

namespace WorkSpaceAPIRepository.Interface
{
    public interface IWorkSpaceRepository
    {
        GetMonthlyTimeLogResponce? GetMyMonthlyTimeLogs(GetMonthlyTimeLogRequest request, out HttpStatusCode? statusCode, out string? errorText);
        List<EmployeeYearlyLog>? GetMyYearlyTimeLog(GetYearlyTimeLogRequest request, out HttpStatusCode? statusCode, out string? errorText);
        ServiceDropDownResponce? ServiceRequestDropDown(ServiceDropDownRequest request, out HttpStatusCode? statusCode, out string? errorText);
        LeaveRequestEmployeeInfoResponce? GetLeaveRequestEmployeeInfo(LeaveRequestEmployeeInfoRequest request, out HttpStatusCode? statusCode, out string? errorText);
    }
}
