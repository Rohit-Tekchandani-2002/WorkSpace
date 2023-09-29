using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WorkSpaceAPIEntites.ViewModels.AttendanceControllerViewModel;
using WorkSpaceAPIEntites.ViewModels.ProjectControllerViewModel;

namespace WorkSpaceAPIRepository.Interface
{
    public interface IProjectRepository
    {
        GetProjectsResponse? GetProjects(GetProjectsRequest getProjectsRequest, out HttpStatusCode? statusCode, out string? errorText);
        List<WorkGroupDetails>? GetWorkGroups(long projectId, out HttpStatusCode? statusCode, out string? errorText);
        List<ProjectStatusCount>? GetProjectStatusCount(long projectId, long? workGroupId, out HttpStatusCode? statusCode, out string? errorText);
        List<GetDropdownDetailResponseModel>? GetAllWorkGroup(long projectId, out HttpStatusCode? statusCode, out string? errorText);
        GetProjectBackLogResponce? GetProjectBackLog(GetProjectBackLogRequest getProjectBackLogRequest, out HttpStatusCode? statusCode, out string? errorText);
        List<WorkBacklog>? GetWorkLog(GetWorkBackLogRequest request, out HttpStatusCode? statusCode, out string? errorText);
        List<GetDropdownDetailResponseModel>? GetProjectTech(out HttpStatusCode? statusCode, out string? errorText);
        void AddWorkItem(AddWorkItemRequest registerRequest, out HttpStatusCode? statusCode, out string? errorText, out long? generatedId);
        ProjectWorkItemResponce? GetProjectWorkItem(long projectWorkId, out HttpStatusCode? statusCode, out string? errorText);
        void UpdateWorkItem(UpdateWorkItemRequest updateWorkItemRequest, out HttpStatusCode? statusCode, out string? errorText);
        List<GetDropdownDetailResponseModel>? GetAllWorkGroupEmployee(long projectId, out HttpStatusCode? statusCode, out string? errorText);
        List<GetDropdownDetailResponseModel>? GetAllWorkGroupSubProject(long projectId, out HttpStatusCode? statusCode, out string? errorText);
        void AddWorkLog(AddWorkLogRequest addWorkLogRequest, out HttpStatusCode? statusCode, out string? errorText);
        void UpdateWorkLog(UpdateWorklogRequest updateWorkLogRequest, out HttpStatusCode? statusCode, out string? errorText);
        List<Worklogs>? GetWorkLogs(long projectWorkId, out HttpStatusCode? statusCode, out string? errorText);
        void DeleteWorkLog(long workLogId, out HttpStatusCode? statusCode, out string? errorText);
        void AddWorkItemComment(AddWorkItemCommentRequest addWorkItemCommentRequest, out HttpStatusCode? statusCode, out string? errorText);
        List<WorkComments>? GetWorkItemComments(long projectWorkId, out HttpStatusCode? statusCode, out string? errorText);
        void DeleteWorkItemComments(long workItemCommentId, out HttpStatusCode? statusCode, out string? errorText);
        List<WorkState>? GetWorkItemState(long projectWorkId, out HttpStatusCode? statusCode, out string? errorText);
        void AddWorkItemAttachment(AddWorkItemAttachmentRequest addWorkItemAttachmentRequest, string? filename, string? filePath, string? fileType, out HttpStatusCode? statusCode, out string? errorText);
        List<WorkItemAttachment>? GetWorkItemAttachments(long projectWorkId, out HttpStatusCode? statusCode, out string? errorText);
        void DeleteWorkItemAttachment(long workItemAttachmentsId, out HttpStatusCode? statusCode, out string? errorText);
        GetWorkItemHistory? GetWorkItemHistory(GetWorkItemHistoryRequest getWorkItemHistoryRequest, out HttpStatusCode? statusCode, out string? errorText);
        WorkGroupDetails? GetWorkGroupFromId(long workGroupId, out HttpStatusCode? statusCode, out string? errorText);
        void UpdateProjectWorkItemTime(UpdateProjectWorkItemTimeRequest updateProjectWorkItemTimeRequest, out HttpStatusCode? statusCode, out string? errorText);
        List<ProjectTeamRosterResponce>? GetProjectTeamRosterDetail(long projectId, out HttpStatusCode? statusCode, out string? errorText);
        List<ProjectActivityStreamResponce>? GetProjectActivityStreamRequest(GetProjectActivityStreamRequest request, out HttpStatusCode? statusCode, out string? errorText);
        GetWorkGroupLogWithPaginationResponce? GetWorkGroupLogWithPagination(GetWorkGroupLogWithPaginationRequest request, out HttpStatusCode? statusCode, out string? errorText);
        Object? GetTimeSheet(GetMytimeSheetRequest request, out HttpStatusCode? statusCode, out string? errorText);
        GetTimeSheetResponce? GetTimeSheetDailyTimeLogEmployeeAndDate(GetMytimeSheetRequest request, out HttpStatusCode? statusCode, out string? errorText);
        List<WorkBacklog>? GetWorkBackLogFromProjectId(GetWorkBackLogFromProjectIdRequest request, out HttpStatusCode? statusCode, out string? errorText);
    }
}
