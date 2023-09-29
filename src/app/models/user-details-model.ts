export interface employeeDetailsResponce {
    employeeDeatilId: bigint,
    profileImage: string,
    userName: string,
    firstName: string,
    lastName: string,
    experience: string,
    email: string,
    joiningDate: Date,
    seniorsFirstName: string,
    seniorsLastName: string,
    seniorsEmail: string,
    cardNo: number,
    grade: number,
    departmentName: string,
    designation: string,
    sittingPlace: string,
    createdAt: Date,
    notificationTypeResolutionChanged: boolean,
    notificationOnAssignedWorkItemChangeByTeamMember: boolean,
    notificationCommnetOnWork: boolean,
    notificationAssignedWork: boolean,
    notificationDailyAlertEmail: boolean,
    notificationOnCreatedWorkItemChangeByTeamMember: boolean
}
export interface changePasswordRequest {
    employeeId: number,
    newpassword: string,
    oldpassword: string
}
export interface notificaiotnRequest {
    employeeId: number,
    notificationTypeResolutionChanged: boolean,
    notificationOnAssignedWorkItemChangeByTeamMember: boolean,
    notificationCommnetOnWork: boolean,
    notificationAssignedWork: boolean,
    notificationDailyAlertEmail: boolean,
    notificationOnCreatedWorkItemChangeByTeamMember: boolean
}
export interface systemItemResponce {
    systemType: number,
    systemItemModel: string,
    systemQuantity: number,
    hasTakenHome: boolean,
    serailId: string
}
export interface systemSpecificationsResponce {
    pcOrLaptopNumber: string,
    pcLocation: string,
    isPrimaryPC: boolean
}
export interface employeePersonalResponce {
    dateOfBirth: Date,
    gender: boolean,
    maritalStatus: boolean,
    bloodGroup: string,
    anyDiseases: string,
    contactNumber: bigint,
    alternateNumber: bigint,
    accountNumber: string,
    panCardNumber: string,
    presentAddress: string,
    permanentAddress: string,
    providentFundNumber: number,
    nsrNumber: number,
    companyMail: string,
    personalMail: string,
    messengers: string,
    passportNumber: string,
    dateOfIssue: Date,
    placeOfIssue: string,
    nameInPassport: string,
    validUpto: Date
}

export interface updatePersoalInfoRequest {
    employeeId: string,
    dateOfBirth: Date,
    gender: boolean,
    maritalStatus: boolean,
    bloodGroup: string | null,
    anyDisease: string | null,
    contactNumber: bigint | null,
    alternateNumber: bigint | null,
    accountNumber: string | null,
    panCardNumber: string | null,
    presentAddress: string | null,
    permanentAddress: string | null,
    providentFundNumber: number | null,
    nsrNumber: number | null,
    companyMail: string | null,
    personalMail: string | null,
    messengers: string | null,
    passportNumber: string | null,
    dateOfIssue: Date,
    placeOfIssue: string | null,
    nameInPassport: string | null,
    validUpto: Date
}

export interface travelInfo {
    visaId: bigint,
    countryName: string,
    visaType: string,
    visaValidFor: Date
}

export interface createTravelInfo {
    employeeId: string,
    countryName: string,
    visaType: string,
    visaValidFor: Date
}