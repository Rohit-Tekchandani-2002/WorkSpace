using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkSpaceAPIEntites.ViewModels.ProjectControllerViewModel
{
    public class GetProjectsRequest
    {
        public long EmployeeId { get; set; } = 0;
        public int? ProjectStatus { get; set; }
        public string? ProjectName { get; set; }
        public int? ProjectType { get; set; }
        public int? ProjectTechId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Expression { get; set; }
        public bool IsSortByAsc { get; set; }
    }
    public class GetProjectBackLogRequest
    {
        public long ProjectId { get; set; } = 0;
        public string? SearchText { get; set; }
        public long? WorkGroupId { get; set; }
        public string AssignedPersonId { get; set; } = String.Empty;
        public long? ReportedPersonId { get; set; }
        public string ProjectType { get; set; } = String.Empty;
        public string ProjectStatus { get; set; } = String.Empty;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Priority { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Expression { get; set; }
        public bool IsSortByAsc { get; set; }
    }
    public class AddWorkItemRequest
    {
        public long EmployeeId { get; set; }
        public long ProjectId { get; set; }
        public long? SubProjectId { get; set; }
        public string Title { get; set; } = string.Empty;
        public long WorkGroupId { get; set; }
        public int WorkFlow { get; set; }
        public string Priority { get; set; } = string.Empty;
        public int ProjectStatusId { get; set; } 
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public float OriginalEstTime { get; set; }
        public float RemainingEstTime { get; set; }
        public long AssignedEmployeeId { get; set; }
        public long ReportedEmployeeId { get; set; }
        public bool ReleasedToProduction { get; set; } = false;
        public float RSI { get; set; } = 1.0f;
        public string? Description { get; set; }
    }
    public class UpdateWorkItemRequest 
    {
        public long ProjectWorkId { get; set; }
        public long? EmployeeId { get; set; }
        public long? ProjectId { get; set; }
        public long? SubProjectId { get; set; }
        public string? Title { get; set; }
        public long? WorkGroupId { get; set; }
        public int? WorkFlow { get; set; }
        public string? Priority { get; set; }
        public int? ProjectStatusId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public float? OriginalEstTime { get; set; }
        public float? RemainingEstTime { get; set; }
        public long? AssignedEmployeeId { get; set; }
        public long? ReportedEmployeeId { get; set; }
        public bool? ReleasedToProduction { get; set; }
        public float? RSI { get; set; }
        public string? Description { get; set; }
    }
    public class AddWorkLogRequest
    {
        public long ProjectWorkId { get; set; }
        public DateTime WorkDoneOn { get; set; }
        public float WorkTime { get; set; }
        public string? Description { get; set; }
    }
    public class UpdateWorklogRequest 
    {
        public long WorkLogId { get; set; }
        public DateTime WorkDoneOn { get; set; }
        public float WorkTime { get; set; }
        public string? Description { get; set; }
    }
    public class UpdateProjectWorkItemTimeRequest
    {
        public long ProjectWorkId { get; set; }
        public float TotalTime { get; set; }
        public float RemaningTime { get; set; }
    }
    public class AddWorkItemCommentRequest
    {
        public long ProjectWorkId { get; set; }
        public long EmployeeId { get; set; }
        public string Comments { get; set; } = string.Empty;
    }
    public class AddWorkItemAttachmentRequest
    {
        public long ProjectWorkId { get; set; }
        public string? Description { get; set; }
    }
    public class GetWorkItemHistoryRequest
    {
        public long WorkItemId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Expression { get; set; }
        public bool IsSortByAsc { get; set; }
    }
    public class GetWorkBackLogRequest
    {
        public long? WorkGroupId { get; set; }
        public string? SearchText { get; set; }
        public string? ProjectType { get; set; }
        public string? ProjectStatus { get; set; }
        public long? AssignedPersonId { get; set; }
        public string? Expression { get; set; }
        public bool IsSortByAsc { get; set; }
    }    
    public class GetWorkBackLogFromProjectIdRequest
    {
        public long? ProjectId { get; set; }
        public long? AssignedPersonId { get; set; }
        public string? Expression { get; set; }
        public bool IsSortByAsc { get; set; }
    }
    public class GetProjectActivityStreamRequest
    {
        public long EmployeeId { get; set; }
        public int? NumberOfClicks { get; set; }
    }
    public class GetWorkGroupLogWithPaginationRequest
    {
        public long WorkGroupId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Expression { get; set; }
        public bool IsSortByAsc { get; set; }
    }
    public class GetMytimeSheetRequest
    {
        public long EmployeeId { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
    }
}