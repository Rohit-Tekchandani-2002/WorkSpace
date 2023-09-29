using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WorkSpaceAPIEntites.ViewModels.AttendanceControllerViewModel;
using WorkSpaceAPIEntites.ViewModels.Common;

namespace WorkSpaceAPIRepository.Interface
{
    public interface IAttendanceRepository
    {
        List<Attendance>? GetAttendance(AttendanceControllerRequest.SearchAttendance searchAttendance, out HttpStatusCode? statusCode, out string? errorText);
        void AddOrUpdateAttendance(AttendanceControllerRequest.AttendanceRequest attendanceRequest, out HttpStatusCode? statusCode, out string? errorText);
        void ApproveAttendance(AttendanceControllerRequest.ApproveAttendanceRequest approveAttendanceRequest, out HttpStatusCode? statusCode, out string? errorText);
        List<GetHoliday>? GetHoliDayList(out HttpStatusCode? statusCode, out string? errorText);
    }
}
