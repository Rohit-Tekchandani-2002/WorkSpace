using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using WorkSpaceAPI.Attributes;
using WorkSpaceAPIEntites.ViewModels.AttendanceControllerViewModel;
using WorkSpaceAPIEntites.ViewModels.Common;
using WorkSpaceAPIRepository.Interface;
using static WorkSpaceAPIEntites.ViewModels.AttendanceControllerViewModel.AttendanceControllerRequest;

namespace WorkSpaceAPI.Controllers
{
    [EnableCors("_myAllowedSpecificOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    [EmployeeAuthorization]
    public class AttendanceController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAttendanceRepository _attendanceRepository;

        public AttendanceController(IConfiguration configuration, IAttendanceRepository attendanceRepository)
        {
            _configuration = configuration;
            _attendanceRepository = attendanceRepository;
        }
        [HttpPost]
        [Route("GetAttendance")]
        public IActionResult GetAttendance(SearchAttendance searchAttendance)
        {
            List<Attendance>? attendance = new List<Attendance>();
            attendance = _attendanceRepository.GetAttendance(searchAttendance, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<Attendance>?> response = new CommonResponse<List<Attendance>?>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = attendance;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            else if (attendance == null)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPost]
        [Route("AddOrUpdateAttendance")]
        public IActionResult AddOrUpdateAttendance(AttendanceRequest attendanceRequest)
        {
            _attendanceRepository.AddOrUpdateAttendance(attendanceRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = errorText;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPost]
        [Route("ApproveAttendance")]
        public IActionResult ApproveAttendance(ApproveAttendanceRequest approveAttendanceRequest)
        {
            _attendanceRepository.ApproveAttendance(approveAttendanceRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> respose = new CommonResponse<string>();
            respose.ErrorMessage = errorText ?? string.Empty;
            respose.Responce = errorText;
            if (StatusCode != HttpStatusCode.OK)
            {
                respose.IsError = true; 
                return BadRequest(errorText);
            }
            respose.IsError = false;
            return Ok(respose);
        }

        [HttpGet]
        [Route("HolidayList")]
        public IActionResult GetHoliDayList()
        {
            List<GetHoliday>? getDropdownModel = new List<GetHoliday>();
            getDropdownModel = _attendanceRepository.GetHoliDayList(out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<GetHoliday>?> response = new CommonResponse<List<GetHoliday>?>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = getDropdownModel;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }
    }
}
