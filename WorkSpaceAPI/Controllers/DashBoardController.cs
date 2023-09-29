using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using WorkSpaceAPI.Attributes;
using WorkSpaceAPIEntites.ViewModels.Common;
using WorkSpaceAPIEntites.ViewModels.DashBoardControllerViewModel;
using WorkSpaceAPIRepository.Interface;

namespace WorkSpaceAPI.Controllers
{
    [EnableCors("_myAllowedSpecificOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    [EmployeeAuthorization]
    public class DashBoardController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IDashBoardRepository _dashBoardRepository;

        public DashBoardController(IConfiguration configuration, IDashBoardRepository dashBoardRepository)
        {
            _configuration = configuration;
            _dashBoardRepository = dashBoardRepository;
        }
        [HttpGet]
        [Route("EmployeeInfo")]
        public IActionResult GetEmployeeInfo(long employeeId)
        {
            EmployeeForDashBoard? employeeInfo = new EmployeeForDashBoard();
            employeeInfo = _dashBoardRepository.GetEmployeeInfo(employeeId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<EmployeeForDashBoard> responce = new CommonResponse<EmployeeForDashBoard>();
            responce.Responce = employeeInfo;
            responce.ErrorMessage = errorText ?? String.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                responce.IsError = true;
                return BadRequest(responce);
            }
            else if (employeeInfo == null)
            {
                responce.IsError = true;
                return Unauthorized(responce);
            }
            responce.IsError = false;
            return Ok(responce);
        }

        [HttpGet]
        [Route("GetUserProjects")]
        public IActionResult GetUserProjects(long employeeId)
        {
            List<UserProjects>? userProjects = new List<UserProjects>();
            userProjects = _dashBoardRepository.GetUserProjects(employeeId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<UserProjects>> responce = new CommonResponse<List<UserProjects>>();
            responce.Responce = userProjects;
            responce.ErrorMessage = errorText ?? String.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                responce.IsError = true;
                return BadRequest(responce);
            }
            else if (userProjects == null)
            {
                responce.IsError = true;
                return Unauthorized(responce);
            }
            responce.IsError = false;
            return Ok(responce);
        }

        [HttpGet]
        [Route("GetnewsAndUpdates")]
        public IActionResult GetnewsAndUpdates()
        {
            List<NewsAndUpdates>? newsAndUpdates = new List<NewsAndUpdates>();
            newsAndUpdates = _dashBoardRepository.GetnewsAndUpdates(out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<NewsAndUpdates>> responce = new CommonResponse<List<NewsAndUpdates>>();
            responce.Responce = newsAndUpdates;
            responce.ErrorMessage = errorText ?? String.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                responce.IsError = true;
                return BadRequest(responce);
            }
            else if (newsAndUpdates == null)
            {
                responce.IsError = true;
                return Unauthorized(responce);
            }
            responce.IsError = false;
            return Ok(responce);
        }
    }
}
