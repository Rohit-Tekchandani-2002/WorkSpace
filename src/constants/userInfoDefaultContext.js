export const employeeInfoDefaultContext = {
    userInfoContext: {
        employeeDeatilId: 0,
        profileImage: "",
        userName: "",
        firstName: "",
        lastName: "",
        experience: "0",
        email: "",
        joiningDate: "",
        seniorsFirstName: "",
        seniorsLastName: "",
        seniorsEmail: "",
        cardNo: 0,
        grade: 0,
        departmentName: "",
        designation: "",
        sittingPlace: "",
        createdAt: "",
        notificationTypeResolutionChanged: false,
        notificationOnAssignedWorkItemChangeByTeamMember: false,
        notificationCommnetOnWork: false,
        notificationAssignedWork: false,
        notificationDailyAlertEmail: false,
        notificationOnCreatedWorkItemChangeByTeamMember: false
    },
    systemConfigContext: {
        systemItems: [],
        systemSpecifications: {
            pcOrLaptopNumber: '',
            pcLocation: '',
            isPrimaryPC: true
        }
    },
    personalInfoContext: {
        personalInfo: {
            dateOfBirth: new Date(),
            gender: true,
            maritalStatus: false,
            bloodGroup: '',
            anyDiseases: '',
            contactNumber: '',
            alternateNumber: '',
            accountNumber: '',
            panCardNumber: '',
            presentAddress: '',
            permanentAddress: '',
            providentFundNumber: 0,
            nsrNumber: 0,
            companyMail: '',
            personalMail: '',
            messengers: '',
            passportNumber: '',
            dateOfIssue: new Date(),
            placeOfIssue: '',
            nameInPassport: '',
            validUpto: new Date()
        },
        travelInfo: []
    }
}