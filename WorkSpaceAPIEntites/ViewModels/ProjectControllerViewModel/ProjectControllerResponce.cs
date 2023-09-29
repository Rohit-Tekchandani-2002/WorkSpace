using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkSpaceAPIEntites.ViewModels.ProjectControllerViewModel
{
    public class GetDropdownDetailResponseModel
    {
        public string KeyId { get; set; } = String.Empty;
        public string DataValue { get; set; } = String.Empty;
    }

    public class GetProjectsResponse
    {
        public List<Project>? Projects { get; set; }
        public int TotalProjects { get; set; }
    }
    public class GetProjectBackLogResponce
    {
        public List<ProjectBackLog>? ProjectBackLogs { get; set; }
        public int TotalProjectBacklogs { get; set; }
    }

    public class Project
    {
        public long RowNum { get; set; }
        public long ProjectId { get; set; }
        public string? ProjectCode { get; set; }
        public string? ProjectName { get; set; }
        public int ProjectType { get; set; }
        public int ProjectStatus { get; set; }
        public long ProjectTechId { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime EndDate { get; set; }
        public int UserCount { get; set; }
        public long TotalHours { get; set; }
        public long AssignedHours { get; set; }
        public long WorkHours { get; set; }
        public float HrsUtilized { get; set; }
    }

    public class ProjectBackLog
    {
        public long RowNum { get; set; }
        public long ProjectWorkId { get; set; }
        public string? WorkGroup { get; set; }
        public string? Title { get; set; }
        public int ProjectStatusId { get; set; }
        public string? ProjectPriority { get; set; }
        public string? AssignedTo { get; set; }
        public float OriginalEst { get; set; }
        public float RemainingEst { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public float TotalWorkDone { get; set; }
    }

    public class WorkGroupDetails
    {
        public long WorkGroupId { get; set; } = 0;
        public string Title { get; set; } = string.Empty;
        public DateTime StartDate { get; set; } 
        public DateTime EndDate { get; set; } 
    }
    public class ProjectStatusCount
    {
        public int ProjectStatusId { get; set; } = 0;
        public int StatusCount { get; set; } = 0;
    }

    public class WorkBacklog
    {
        public long RowNum { get; set; }
        public long ProjectWorkId { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public float OriginalEstTime { get; set; }
        public float RemainingEstTime { get; set; }
        public string AssignedTo { get; set; } = string.Empty;
        public string WorkPriority { get; set; } = string.Empty;
        public int ProjectStatusId { get; set; }
        public int WorkFlow { get; set; }
        public DateTime CreatedAt { get; set; }
        public float TotalWorkDone { get; set; }
    }

    public class ProjectWorkItemResponce
    {
        public string Title { get; set;} = string.Empty;
        public long WorkGroupId { get; set; }
        public long WorkFlow { get; set; }
        public string Priority { get; set; } = string.Empty;
        public int ProjectStatusId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public float OriginalEstTime { get; set; }
        public float RemainingEstTime { get; set; }
        public float TotalWorkDone { get; set; }
        public long AssignedEmployeeId { get; set; }
        public long ReportedEmployeeId { get; set; }
        public long? SubProjectId { get; set; }
        public bool ReleasedToProduction { get; set; } = false;
        public float RSI { get; set; } = 1;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
    public class Worklogs
    {
        public long WorkLogId { get; set; }
        public DateTime WorkDoneOn { get; set; }
        public float WorkedHours { get; set; }
        public string Employee { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
    public class WorkComments
    {
        public long WorkItemCommentId { get; set; }
        public string Comments { get; set; } = string.Empty;
        public string Employee { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }    
    public class WorkState
    {
        public long WorkItemStateId { get; set; }
        public long ProjectStatusId { get; set; }
        public string Employee { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
    public class WorkItemAttachment
    {
        public long WorkItemAttachmentsId { get; set; }
        public string? FileName { get; set; }
        public string FilePath { get; set; } = string.Empty;
        public string filetype { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class WorkItemHistory
    {
        public long RowNum { get; set; }
        public string Field { get; set; } = string.Empty;
        public string ChangedBy { get; set; } = string.Empty;
        public DateTime ChangedOn { get; set; }
        public float OldValue { get; set; }
        public float NewValue { get; set; }
    }

    public class GetWorkItemHistory
    {
        public List<WorkItemHistory>? WorkItemHistorys { get; set; }
        public int TotalProjectCount { get; set; }
    }

    public class ProjectTeamRosterResponce
    {
        public string EmployeeName { get; set; } = string.Empty;
        public float Capacity { get; set; } = 0;
        public float AssignedWork { get; set; } = 0;
        public float RemaningWork { get; set; } = 0;
        public float PresentageComplete { get; set; } = 0;
        public float PresentageAllocation { get; set; } = 0;
    }
    
    public class ProjectActivityStreamResponce
    {
        public long WorkItemHistoryId { get; set; }
        public long ProjectWorkId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Field { get; set; } = string.Empty;
        public string EmployeeName { get; set; } = string.Empty;
        public float OldValue { get; set; } = 0;
        public float NewValue { get; set; } = 0;
        public string TitleDate { get; set; } = string.Empty;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
    }
    public class ProjectWorkLog
    {
        public long RowNum { get; set; }
        public long ProjectWorkId { get; set; }
        public long WorkLogId { get; set; }
        public int ProjectStatusId { get; set; }
        public string? Title { get; set; }
        public string? Employee { get; set; }
        public DateTime WorkDoneOn { get; set; }
        public float WorkedHours { get; set; }
    }
    public class GetWorkGroupLogWithPaginationResponce
    {
        public List<ProjectWorkLog>? ProjectWorkLogs { get; set; }
        public int TotalProjectBacklogs { get; set; }
    }
    public class GetTimeSheetWorkLogDateResponce
    {
        public DateTime WorkDoneOn { get; set; }
        public float WorkTime { get; set; }
    }
    public class GetTimeSheetTimeLogDateResponce
    {
        public DateTime LogDate { get; set; }
        public float TimeLog { get; set; }
    }
    public class GetTimeSheetResponce
    {
        public List<GetTimeSheetWorkLogDateResponce>? workList { get; set; }
        public List<GetTimeSheetTimeLogDateResponce>? timeList { get; set; }
    }
}
