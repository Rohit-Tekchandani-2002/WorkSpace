using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using System.Data;
using System.Net;
using WorkSpaceAPI.Attributes;
using WorkSpaceAPIEntites.ViewModels.Common;
using WorkSpaceAPIRepository.Interface;
using WorkSpaceAPIEntites.ViewModels.WorkSpaceControllerViewModel;

namespace WorkSpaceAPI.Controllers
{
    [EnableCors("_myAllowedSpecificOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    [EmployeeAuthorization]
    public class WorkSpaceController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWorkSpaceRepository _workSpaceRepository;

        public WorkSpaceController(IConfiguration configuration, IWorkSpaceRepository workSpaceRepository)
        {
            _configuration = configuration;
            _workSpaceRepository = workSpaceRepository;
        }

        [HttpPost]
        [Route("GetMyMonthlyTimeLogs")]
        public IActionResult GetMyMonthlyTimeLogs(GetMonthlyTimeLogRequest request)
        {
            GetMonthlyTimeLogResponce? projectsResponse = new GetMonthlyTimeLogResponce();
            projectsResponse = _workSpaceRepository.GetMyMonthlyTimeLogs(request, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<GetMonthlyTimeLogResponce> response = new CommonResponse<GetMonthlyTimeLogResponce>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = projectsResponse;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            else if (projectsResponse == null)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPost]
        [Route("GetMyYearlyTimeLog")]
        public IActionResult GetMyYearlyTimeLog(GetYearlyTimeLogRequest request)
        {
            List<EmployeeYearlyLog>? projectsResponse = new List<EmployeeYearlyLog>();
            projectsResponse = _workSpaceRepository.GetMyYearlyTimeLog(request, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<EmployeeYearlyLog>> response = new CommonResponse<List<EmployeeYearlyLog>>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = projectsResponse;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            else if (projectsResponse == null)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPost]
        [Route("GetLeaveRequestEmployeeInfo")]
        public IActionResult GetLeaveRequestEmployeeInfo(LeaveRequestEmployeeInfoRequest request)
        {
            LeaveRequestEmployeeInfoResponce? projectsResponse = new LeaveRequestEmployeeInfoResponce();
            projectsResponse = _workSpaceRepository.GetLeaveRequestEmployeeInfo(request, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<LeaveRequestEmployeeInfoResponce> response = new CommonResponse<LeaveRequestEmployeeInfoResponce>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = projectsResponse;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            else if (projectsResponse == null)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }
        
        [HttpPost]
        [Route("ServiceRequestDropDown")]
        public IActionResult ServiceRequestDropDown(ServiceDropDownRequest request)
        {
            ServiceDropDownResponce? projectsResponse = new ServiceDropDownResponce();
            projectsResponse = _workSpaceRepository.ServiceRequestDropDown(request, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<ServiceDropDownResponce> response = new CommonResponse<ServiceDropDownResponce>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = projectsResponse;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            else if (projectsResponse == null)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }


    }
}
