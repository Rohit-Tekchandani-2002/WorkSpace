using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkSpaceAPIEntites.ViewModels.EmployeeInfoControllerViewModel
{
    public class EmployeeInfo
    {
        public long EmployeeDeatilId { get; set; } = 0;
        public string? ProfileImage { get; set; }
        public string? UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Experience { get; set; }
        public string? Email { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string? SeniorsFirstName { get; set; }
        public string? SeniorsLastName { get; set; }
        public string? SeniorsEmail { get; set; }
        public long? CardNo { get; set; }
        public int? Grade { get; set; }
        public string? DepartmentName { get; set; }
        public string? Designation { get; set; }
        public string? SittingPlace { get; set; }
        public DateTime? CreatedAt { get; set;  }
        public bool NotificationTypeResolutionChanged { get; set; }
        public bool NotificationOnAssignedWorkItemChangeByTeamMember { get; set; }
        public bool NotificationCommnetOnWork { get; set; }
        public bool NotificationAssignedWork { get; set; }
        public bool NotificationDailyAlertEmail { get; set; }
        public bool NotificationOnCreatedWorkItemChangeByTeamMember { get; set; }    
    }
    public class EmployeePresonalInfo
    {
        public DateTime? DateOfBirth { get;  set; } 
        public bool? Gender  {get; set;}
        public bool? MaritalStatus {get; set;}
        public string? BloodGroup {get; set;}
        public string? AnyDiseases {get; set;}
        public long? ContactNumber {get; set;}
        public long? AlternateNumber {get; set;}
        public string? AccountNumber {get; set;}
        public string? PanCardNumber {get; set;}
        public string? PresentAddress {get; set;}
        public string? PermanentAddress {get; set;}
        public long? ProvidentFundNumber {get; set;}
        public long? NSRNumber {get; set;}
        public string? CompanyMail {get; set;}
        public string? PersonalMail {get; set;}
        public string? Messengers {get; set;}
        public string? PassportNumber {get; set;}
        public DateTime? DateOfIssue {get; set;}
        public string? PlaceOfIssue {get; set;}
        public string? NameInPassport { get; set; }
        public DateTime? ValidUpto { get; set; }
    }
    public class CountryVisaInfo 
    {
        public long VisaId { get; set; } = 0;    
        public string? CountryName { get; set; }
        public string? VisaType { get; set; }
        public DateTime? VisaValidFor { get; set; }
    }
    public class SystemSpecifications
    {
        public string? PcOrLaptopNumber { get; set;}
        public string? PcLocation { get; set;}
        public bool IsPrimaryPC { get; set;} = false;
    }
    public class SystemItems
    {
        public int? SystemType {get; set;}
	    public string? SystemItemModel {get; set;}
	    public long? SystemQuantity {get; set;}
	    public bool? HasTakenHome {get; set;}
	    public string? SerailId { get; set; }
    }
    public class SystemConfiguration
    {
        public SystemSpecifications? systemSpecifications { get; set;}
        public List<SystemItems>? systemItems { get; set;}
    }
}
