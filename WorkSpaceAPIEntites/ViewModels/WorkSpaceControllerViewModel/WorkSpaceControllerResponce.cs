using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkSpaceAPIEntites.ViewModels.Common;

namespace WorkSpaceAPIEntites.ViewModels.WorkSpaceControllerViewModel
{
    public class GetMonthlyTimeLogResponce
    {
        public EmployeeTimeLogInfo? EmployeeInfo { get; set; }
        public List<EmployeeMonthlyLog>? EmployeeMonthlyLogs { get; set; }
    }

    public class EmployeeTimeLogInfo
    {
        public long EmployeeNo { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Shift { get; set; } = String.Empty;
        public float Experience { get; set; } 
        public float Hours { get; set; }
        public float PresentDays { get; set; }
        public float LeaveDays { get; set; }
        public float HalfLeave { get; set; }
        public float LateDays { get; set; }
        public float AvgTimeLog { get; set; }
        public float AvgWorkLog { get; set; }
        public float Difference { get; set; }
        public float OutHours { get; set; }
    }

    public class EmployeeMonthlyLog
    {
        public string Date { get; set; } = String.Empty;
        public float LateComer { get; set; } 
        public float FirstInTime { get; set; } 
        public float LastOutTime { get; set; } 
        public float TotalOutHours { get; set; } 
        public float WorkLog { get; set; } 
    }

    public class EmployeeYearlyLog
    {
        public long EmployeeNo { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Month { get; set; } = String.Empty;
        public float Hours { get; set; }
        public float PDays { get; set; }
        public float LDays { get; set; }
        public float HalfLeaves { get; set; }
        public float LateDays { get; set; }
        public float AvgTimeLog { get; set; }
        public float AvgWorkLog { get; set; }
        public float Difference { get; set; }
        public float OutHours { get; set; }
    }

    public class LeaveRequestEmployeeInfoResponce
    {
        public long EmployeeNo { get; set; }
        public string EmployeeName { get; set; } = String.Empty;
        public long ReportingPersonId { get; set; }
        public string ReportingPersonName { get; set; } = String.Empty;
        public long PhoneNumber { get; set;}   
        public long AlternatePhoneNumber { get; set;}   
        public DateTime LeaveStartDate { get; set;}   
        public DateTime LeaveEndDate { get; set;}   
        public DateTime RequestedDate { get; set;}   
        public float Duration { get; set;}   
        public DateTime ReturnDate { get; set;}   
    }

    public class ServiceDropDownResponce
    {
        public List<DropDownResponce> ServiceGroupList { get; set; } = new List<DropDownResponce>(); 
        public List<DropDownResponce>? CategoriList { get; set; } 
        public List<DropDownResponce>? SubCategoriList { get; set; } 
    }
}
