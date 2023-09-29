using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using WorkSpaceAPI.Attributes;
using WorkSpaceAPIEntites.ViewModels.Common;
using WorkSpaceAPIEntites.ViewModels.EmployeeInfoControllerViewModel;
using WorkSpaceAPIEntites.ViewModels.ProjectControllerViewModel;
using WorkSpaceAPIRepository.Interface;

namespace WorkSpaceAPI.Controllers
{
    [EnableCors("_myAllowedSpecificOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    [EmployeeAuthorization]
    public class EmplyeeDetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IEmployeeInfoRepository _employeeInfoRepository;

        public EmplyeeDetailsController(IConfiguration configuration, IEmployeeInfoRepository employeeInfoRepository)
        {
            _configuration = configuration;
            _employeeInfoRepository = employeeInfoRepository;
        }

        //[Authorize]
        [HttpGet]
        [Route("EmployeeInfo")]
        public IActionResult GetEmployeeInfo(long employeeId)
        {
            EmployeeInfo? employeeInfo = new EmployeeInfo();
            employeeInfo = _employeeInfoRepository.GetEmployeeInfo(employeeId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<EmployeeInfo> responce = new CommonResponse<EmployeeInfo>();
            responce.ErrorMessage = errorText ?? String.Empty;
            responce.Responce = employeeInfo;
            if (StatusCode != HttpStatusCode.OK)
            {
                responce.IsError = true;
                return BadRequest(errorText);
            }
            else if (employeeInfo == null)
            {
                responce.IsError = true;
                return BadRequest(errorText);
            }
            responce.IsError = false;
            return Ok(responce);
        }   
        
        [HttpGet]
        [Route("EmployeeNameAndId")]
        public IActionResult EmployeeNameAndId()
        {
            List<GetDropdownDetailResponseModel>? employeeInfo = new List<GetDropdownDetailResponseModel>();
            employeeInfo = _employeeInfoRepository.EmployeeNameAndId(out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<GetDropdownDetailResponseModel>> response = new CommonResponse<List<GetDropdownDetailResponseModel>>();
            response.ErrorMessage = errorText ?? String.Empty;
            response.Responce = employeeInfo;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            else if (employeeInfo == null)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPut]
        [Route("ChangePassword")]
        public IActionResult ChangePassword(ChangePasswordRequest changePasswordRequest)
        {
            _employeeInfoRepository.ChangePassword(changePasswordRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage= errorText ?? String.Empty;
            response.Responce = errorText ?? String.Empty;

            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPut]
        [Route("ChageNotificationSetting")]
        public IActionResult ChageNotificationSetting(ChangeNotificationRequest changeNotificationRequest)
        {
            _employeeInfoRepository.ChangeNotificationSetting(changeNotificationRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? String.Empty;
            response.Responce = errorText ?? String.Empty;

            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpGet]
        [Route("GetEmployeePresonalInfo")]
        public IActionResult GetEmployeePresonalInfo(long employeeId)
        {
            EmployeePresonalInfo? employeePresonalInfo = new EmployeePresonalInfo();
            employeePresonalInfo = _employeeInfoRepository.GetEmployeepersonalInfo(employeeId, out HttpStatusCode ? StatusCode, out string? errorText);
            CommonResponse<EmployeePresonalInfo> response = new CommonResponse<EmployeePresonalInfo>();
            response.ErrorMessage = errorText ?? String.Empty;
            response.Responce = employeePresonalInfo;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            else if (employeePresonalInfo == null)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpGet]
        [Route("GetEmployeeTravelInfo")]
        public IActionResult GetEmployeeTravelInfo(long employeeId)
        {
            List<CountryVisaInfo>? info = new List<CountryVisaInfo>();
            info = _employeeInfoRepository.GetEmployeeTravelInfo(employeeId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<CountryVisaInfo>> response = new CommonResponse<List<CountryVisaInfo>>();
            response.ErrorMessage = errorText ?? String.Empty;
            response.Responce = info;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            else if (info == null)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPut]
        [Route("UpdatePersonalInfo")]
        public IActionResult UpdatePersonalInfo(ChangeEmployeeInfoRequest changeEmployeeInfoRequest)
        {
            _employeeInfoRepository.UpdatePersonalInfo(changeEmployeeInfoRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? String.Empty;
            response.Responce = errorText ?? String.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpGet]
        [Route("GetSystemConfiguration")]
        public IActionResult GetSystemConfiguration(long employeeId)
        {
            SystemConfiguration? systemConfiguration = new SystemConfiguration();
            systemConfiguration = _employeeInfoRepository.GetSystemConfiguration(employeeId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<SystemConfiguration> response = new CommonResponse<SystemConfiguration>();   
            response.ErrorMessage = errorText ?? String.Empty;
            response.Responce = systemConfiguration;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            else if (systemConfiguration == null)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPost]
        [Route("CreateCountryVisaInfo")]
        public IActionResult CreateCountryVisaInfo(CreateCountryVisaInfoRequest createCountryVisaInfoRequest)
        {
            _employeeInfoRepository.CreateCountryVisaInfo(createCountryVisaInfoRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? String.Empty;
            response.Responce = errorText ?? String.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPut]
        [Route("UpdateCountryVisaInfo")]
        public IActionResult UpdateCountryVisaInfo(UpdateCountryVisaInfoRequest updateCountryVisaInfoRequest)
        {
            _employeeInfoRepository.UpdateCountryVisaInfo(updateCountryVisaInfoRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? String.Empty;
            response.Responce = errorText ?? String.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpDelete]
        [Route("DeleteCountryVisaInfo")]
        public IActionResult DeleteCountryVisaInfo(long visaInfoId)
        {
            _employeeInfoRepository.DeleteCountryVisaInfo(visaInfoId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? String.Empty;
            response.Responce = errorText ?? String.Empty;
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
