using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net;
using WorkSpaceAPI.Attributes;
using WorkSpaceAPIEntites.ViewModels.Common;
using WorkSpaceAPIEntites.ViewModels.ProjectControllerViewModel;
using WorkSpaceAPIRepository.Interface;

namespace WorkSpaceAPI.Controllers
{
    [EnableCors("_myAllowedSpecificOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    [EmployeeAuthorization]
    public class ProjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IProjectRepository _projectRepository;

        public ProjectController(IConfiguration configuration, IProjectRepository projectRepository)
        {
            _configuration = configuration;
            _projectRepository = projectRepository;
        }

        [HttpGet]
        [Route("GetProjectTech")]
        public IActionResult GetProjectTech()
        {
            List<GetDropdownDetailResponseModel>? projectsResponse = new List<GetDropdownDetailResponseModel>();
            projectsResponse = _projectRepository.GetProjectTech(out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<GetDropdownDetailResponseModel>?> response = new CommonResponse<List<GetDropdownDetailResponseModel>?>();
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
        [Route("GetProjects")]
        public IActionResult GetProjects(GetProjectsRequest getProjectsRequest)
        {
            GetProjectsResponse? projectsResponse = new GetProjectsResponse();
            projectsResponse = _projectRepository.GetProjects(getProjectsRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<GetProjectsResponse> response = new CommonResponse<GetProjectsResponse>();
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

        [HttpGet]
        [Route("GetWorkGroups")]
        public IActionResult GetWorkGroups(long projectId)
        {
            List<WorkGroupDetails>? projectsResponse = new List<WorkGroupDetails>();
            projectsResponse = _projectRepository.GetWorkGroups(projectId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<WorkGroupDetails>> response = new CommonResponse<List<WorkGroupDetails>>();
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

        [HttpGet]
        [Route("GetProjectStatusCount")]
        public IActionResult GetProjectStatusCount(long projectId, long? workGroupId)
        {
            List<ProjectStatusCount>? projectsResponse = new List<ProjectStatusCount>();
            projectsResponse = _projectRepository.GetProjectStatusCount(projectId, workGroupId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<ProjectStatusCount>> response = new CommonResponse<List<ProjectStatusCount>>();
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

        [HttpGet]
        [Route("GetAllWorkGroup")]
        public IActionResult GetAllWorkGroup(long projectId)
        {
            List<GetDropdownDetailResponseModel>? projectsResponse = new List<GetDropdownDetailResponseModel>();
            projectsResponse = _projectRepository.GetAllWorkGroup(projectId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<GetDropdownDetailResponseModel>> response = new CommonResponse<List<GetDropdownDetailResponseModel>>();
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
        [Route("GetProjectBackLog")]
        public IActionResult GetProjectBackLog(GetProjectBackLogRequest getProjectBackLogRequest)
        {
            GetProjectBackLogResponce? projectsResponse = new GetProjectBackLogResponce();
            projectsResponse = _projectRepository.GetProjectBackLog(getProjectBackLogRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<GetProjectBackLogResponce> response = new CommonResponse<GetProjectBackLogResponce>();
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

        [HttpGet]
        [Route("GetWorkGroupFromId")]
        public IActionResult GetWorkGroupFromId(long workGroupId)
        {
            WorkGroupDetails? projectsResponse = new WorkGroupDetails();
            projectsResponse = _projectRepository.GetWorkGroupFromId(workGroupId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<WorkGroupDetails> response = new CommonResponse<WorkGroupDetails>();
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
        [Route("GetWorkLog")]
        public IActionResult GetWorkLog(GetWorkBackLogRequest request)
        {
            List<WorkBacklog>? projectsResponse = new List<WorkBacklog>();
            projectsResponse = _projectRepository.GetWorkLog(request, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<WorkBacklog>> response = new CommonResponse<List<WorkBacklog>>();
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
        [Route("GetWorkBackLogFromProjectId")]
        public IActionResult GetWorkBackLogFromProjectId(GetWorkBackLogFromProjectIdRequest request)
        {
            List<WorkBacklog>? projectsResponse = new List<WorkBacklog>();
            projectsResponse = _projectRepository.GetWorkBackLogFromProjectId(request, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<WorkBacklog>> response = new CommonResponse<List<WorkBacklog>>();
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
        [Route("AddWorkItem")]
        public IActionResult AddWorkItem(AddWorkItemRequest registerRequest)
        {
            _projectRepository.AddWorkItem(registerRequest, out HttpStatusCode? StatusCode, out string? errorText, out long? generatedId);
            CommonResponse<long?> response = new CommonResponse<long?>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = generatedId;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpGet]
        [Route("GetProjectWorkItem")]
        public IActionResult GetProjectWorkItem(long projectWorkId)
        {
            ProjectWorkItemResponce? projectsResponse = new ProjectWorkItemResponce();
            projectsResponse = _projectRepository.GetProjectWorkItem(projectWorkId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<ProjectWorkItemResponce> response = new CommonResponse<ProjectWorkItemResponce>();
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

        [HttpPut]
        [Route("UpdateWorkItem")]
        public IActionResult UpdateWorkItem(UpdateWorkItemRequest updateWorkItemRequest)
        {
            _projectRepository.UpdateWorkItem(updateWorkItemRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = errorText ?? string.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpGet]
        [Route("GetAllWorkGroupEmployee")]
        public IActionResult GetAllWorkGroupEmployee(long projectId)
        {
            List<GetDropdownDetailResponseModel>? projectsResponse = new List<GetDropdownDetailResponseModel>();
            projectsResponse = _projectRepository.GetAllWorkGroupEmployee(projectId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<GetDropdownDetailResponseModel>> response = new CommonResponse<List<GetDropdownDetailResponseModel>>();
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

        [HttpGet]
        [Route("GetAllWorkGroupSubProject")]
        public IActionResult GetAllWorkGroupSubProject(long projectId)
        {
            List<GetDropdownDetailResponseModel>? projectsResponse = new List<GetDropdownDetailResponseModel>();
            projectsResponse = _projectRepository.GetAllWorkGroupSubProject(projectId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<GetDropdownDetailResponseModel>> response = new CommonResponse<List<GetDropdownDetailResponseModel>>();
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
        [Route("AddWorkLog")]
        public IActionResult AddWorkLog(AddWorkLogRequest addWorkLogRequest)
        {
            _projectRepository.AddWorkLog(addWorkLogRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = errorText ?? string.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpGet]
        [Route("GetWorkLogs")]
        public IActionResult GetWorkLogs(long projectWorkId)
        {
            List<Worklogs>? projectsResponse = new List<Worklogs>();
            projectsResponse = _projectRepository.GetWorkLogs(projectWorkId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<Worklogs>> response = new CommonResponse<List<Worklogs>>();
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

        [HttpPut]
        [Route("UpdateWorkLog")]
        public IActionResult UpdateWorkLog(UpdateWorklogRequest updateWorkLogRequest)
        {
            _projectRepository.UpdateWorkLog(updateWorkLogRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = errorText ?? string.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPut]
        [Route("UpdateProjectWorkItemTime")]
        public IActionResult UpdateProjectWorkItemTime(UpdateProjectWorkItemTimeRequest updateProjectWorkItemTimeRequest)
        {
            _projectRepository.UpdateProjectWorkItemTime(updateProjectWorkItemTimeRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = errorText ?? string.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpDelete]
        [Route("DeleteWorkLog")]
        public IActionResult DeleteWorkLog(long @WorkLogId)
        {
            _projectRepository.DeleteWorkLog(@WorkLogId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = errorText ?? string.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPost]
        [Route("AddWorkItemComment")]
        public IActionResult AddWorkItemComment(AddWorkItemCommentRequest addWorkItemCommentRequest)
        {
            _projectRepository.AddWorkItemComment(addWorkItemCommentRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = errorText ?? string.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpGet]
        [Route("GetWorkItemComments")]
        public IActionResult GetWorkItemComments(long projectWorkId)
        {
            List<WorkComments>? projectsResponse = new List<WorkComments>();
            projectsResponse = _projectRepository.GetWorkItemComments(projectWorkId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<WorkComments>> response = new CommonResponse<List<WorkComments>>();
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

        [HttpDelete]
        [Route("DeleteWorkItemComments")]
        public IActionResult DeleteWorkItemComments(long WorkItemCommentId)
        {
            _projectRepository.DeleteWorkItemComments(WorkItemCommentId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = errorText ?? string.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpGet]
        [Route("GetWorkItemState")]
        public IActionResult GetWorkItemState(long projectWorkId)
        {
            List<WorkState>? projectsResponse = new List<WorkState>();
            projectsResponse = _projectRepository.GetWorkItemState(projectWorkId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<WorkState>> response = new CommonResponse<List<WorkState>>();
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
        [Route("AddWorkItemAttachment")]
        public async Task<IActionResult> AddWorkItemAttachment([FromForm] long projectWorkId, [FromForm] string? description)
        {
            var formCollection = await Request.ReadFormAsync();
            var files = formCollection.Files;
            string assestPath = "D:\\AngularWorkingExample\\workSpace\\src\\assets";
            CommonResponse<string> response = new CommonResponse<string>();
            foreach (var file in files)
            {
                string ImagePath = "";
                string ContentType = "";
                if (file != null)
                {
                    string directory = $"{assestPath}/Uploads/ProjectWorkItemAttchments/";
                    if (!Directory.Exists(directory))
                    {
                        Directory.CreateDirectory(directory);
                    }
                    string newfilename = $"{Path.GetFileNameWithoutExtension(file?.FileName)}-{DateTime.Now.ToString("yyyyMMddhhmmss")}.{Path.GetExtension(file?.FileName)?.Trim('.')}";
                    string path = $"{directory}{newfilename}";
                    using (FileStream fs = new FileStream(path, FileMode.Create))
                    {
                        if (file != null)
                        await file.CopyToAsync(fs);
                        ImagePath = $"/assets/Uploads/ProjectWorkItemAttchments/{newfilename}";
                        ContentType = Path.GetExtension(file?.FileName) ?? String.Empty;

                        AddWorkItemAttachmentRequest addWorkItemAttachmentRequest = new AddWorkItemAttachmentRequest();
                        addWorkItemAttachmentRequest.ProjectWorkId = projectWorkId;
                        addWorkItemAttachmentRequest.Description = description;
                        _projectRepository.AddWorkItemAttachment(addWorkItemAttachmentRequest, file?.FileName, ImagePath, ContentType, out HttpStatusCode? StatusCode, out string? errorText);
                        response.ErrorMessage = errorText ?? string.Empty;
                        response.Responce = errorText ?? string.Empty;
                        if (StatusCode != HttpStatusCode.OK)
                        {
                            response.IsError = true;
                            return BadRequest(errorText);
                        }
                    }
                }
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpGet]
        [Route("GetWorkItemAttachments")]
        public IActionResult GetWorkItemAttachments(long projectWorkId)
        {
            List<WorkItemAttachment>? projectsResponse = new List<WorkItemAttachment>();
            projectsResponse = _projectRepository.GetWorkItemAttachments(projectWorkId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<WorkItemAttachment>> response = new CommonResponse<List<WorkItemAttachment>>();
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

        [HttpDelete]
        [Route("DeleteWorkItemAttachment")]
        public IActionResult DeleteWorkItemAttachment(long workItemAttachmentsId)
        {
            _projectRepository.DeleteWorkItemAttachment(workItemAttachmentsId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<string> response = new CommonResponse<string>();
            response.ErrorMessage = errorText ?? string.Empty;
            response.Responce = errorText ?? string.Empty;
            if (StatusCode != HttpStatusCode.OK)
            {
                response.IsError = true;
                return BadRequest(errorText);
            }
            response.IsError = false;
            return Ok(response);
        }

        [HttpPost]
        [Route("GetWorkItemHistory")]
        public IActionResult GetWorkItemHistory(GetWorkItemHistoryRequest getWorkItemHistoryRequest)
        {
            GetWorkItemHistory? projectsResponse = new GetWorkItemHistory();
            projectsResponse = _projectRepository.GetWorkItemHistory(getWorkItemHistoryRequest, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<GetWorkItemHistory> response = new CommonResponse<GetWorkItemHistory>();
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


        [HttpGet]
        [Route("GetProjectTeamRosterDetail")]
        public IActionResult GetProjectTeamRosterDetail(long projectId)
        {
            List<ProjectTeamRosterResponce>? projectsResponse = new List<ProjectTeamRosterResponce>();
            projectsResponse = _projectRepository.GetProjectTeamRosterDetail(projectId, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<ProjectTeamRosterResponce>> response = new CommonResponse<List<ProjectTeamRosterResponce>>();
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
        [Route("GetProjectActivityStreamRequest")]
        public IActionResult GetProjectActivityStreamRequest(GetProjectActivityStreamRequest request)
        {
            List<ProjectActivityStreamResponce>? projectsResponse = new List<ProjectActivityStreamResponce>();
            projectsResponse = _projectRepository.GetProjectActivityStreamRequest(request, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<List<ProjectActivityStreamResponce>> response = new CommonResponse<List<ProjectActivityStreamResponce>>();
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
        [Route("GetWorkGroupLogWithPagination")]
        public IActionResult GetWorkGroupLogWithPagination(GetWorkGroupLogWithPaginationRequest request)
        {
            GetWorkGroupLogWithPaginationResponce? projectsResponse = new GetWorkGroupLogWithPaginationResponce();
            projectsResponse = _projectRepository.GetWorkGroupLogWithPagination(request, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<GetWorkGroupLogWithPaginationResponce> response = new CommonResponse<GetWorkGroupLogWithPaginationResponce>();
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
        [Route("GetTimeSheet")]
        public IActionResult GetTimeSheet(GetMytimeSheetRequest request)
        {
            Object? projectsResponse = new Object();
            projectsResponse = _projectRepository.GetTimeSheet(request, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<Object> response = new CommonResponse<Object>();
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
        [Route("GetTimeSheetDailyTimeLogEmployeeAndDate")]
        public IActionResult GetTimeSheetDailyTimeLogEmployeeAndDate(GetMytimeSheetRequest request)
        {
            GetTimeSheetResponce? projectsResponse = new GetTimeSheetResponce();
            projectsResponse = _projectRepository.GetTimeSheetDailyTimeLogEmployeeAndDate(request, out HttpStatusCode? StatusCode, out string? errorText);
            CommonResponse<GetTimeSheetResponce> response = new CommonResponse<GetTimeSheetResponce>();
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
