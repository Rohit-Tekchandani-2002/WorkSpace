using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkSpaceAPIEntites.ViewModels.EmployeeInfoControllerViewModel
{
    public class ChangePasswordRequest
    {
        public long employeeId { get; set; } = 0;
        public string newPassword { get; set; } = string.Empty;
        public string oldpassword { get; set; } = string.Empty;
    }

    public class ChangeNotificationRequest
    {
        public long employeeId { get; set; } = 0;
        public bool notificationTypeResolutionChanged { get; set; } = false;
        public bool notificationOnAssignedWorkItemChangeByTeamMember { get; set; } = false;
        public bool notificationCommnetOnWork { get; set; } = false;
        public bool notificationAssignedWork { get; set; } = false;
        public bool notificationDailyAlertEmail { get; set; } = false;
        public bool notificationOnCreatedWorkItemChangeByTeamMember { get; set; } = false;
    }

    public class ChangeEmployeeInfoRequest
    {
        public long? employeeId {get; set;}
        public DateTime? dateOfBirth {get; set;}
        public bool? gender {get; set;}
        public bool? maritalStatus {get; set;}
        public string? bloodGroup {get; set;}
        public string? anyDisease {get; set;}
        public long? contactNumber {get; set;}
        public long? alternateNumber {get; set;}
        public string? accountNumber{get; set;}
        public string? panCardNumber {get; set;}
        public string? presentAddress {get; set;}
        public string? permanentAddress {get; set;}
        public long? providentFundNumber {get; set;}
        public long? nsrNumber {get; set;}
        public string? companyMail {get; set;}
        public string? personalMail{get; set;}
        public string? messengers {get; set;}
        public string? passportNumber{get; set;}
        public DateTime? dateOfIssue {get; set;}
        public string? placeOfIssue {get; set;}
        public string? nameInPassport {get; set;}
        public DateTime? validUpto { get; set; }
    }

    public class CreateCountryVisaInfoRequest
    {
        public long employeeId { get; set; } = 0;
        public string countryName { get; set; } = String.Empty;
        public string visaType { get; set; } = String.Empty;
        public DateTime? visaValidFor { get; set; }
    }
    public class UpdateCountryVisaInfoRequest
    {
        public long visaId { get; set; } = 0;
        public string countryName { get; set; } = String.Empty;
        public string visaType { get; set; } = String.Empty;
        public DateTime? visaValidFor { get; set; }
    }
}
