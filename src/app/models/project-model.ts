export interface DropDownResponce {
    keyId: string,
    dataValue: string
}
export interface ProjectRequest {
    employeeId: string,
    projectStatus: number | null,
    projectName: string | null,
    projectType: number | null,
    projectTechId: bigint | null,
    pageNumber: number,
    pageSize: number,
    expression: string,
    isSortByAsc: boolean
}
export interface ProjectBackLogRequest {
    projectId: string,
    searchText: string | null,
    workGroupId: bigint | null,
    assignedPersonId: string,
    reportedPersonId: bigint | null,
    projectType: string | null,
    projectStatus: string | null,
    startDate: Date | null,
    endDate: Date | null,
    priority: string | null,
    pageNumber: number | null,
    pageSize: number,
    expression: string | null,
    isSortByAsc: boolean | null
}
export interface Project {
    rowNum: BigInt,
    projectId: BigInt,
    projectCode: string,
    projectName: string,
    projectType: number,
    projectStatus: number,
    projectTechId: number,
    dueDate: Date,
    endDate: Date,
    userCount: number,
    totalHours: number,
    assignedHours: number,
    workHours: number,
    hrsUtilized: number
}
export interface ProjectLog {
    rowNum: BigInt,
    projectWorkId: BigInt,
    workGroup: string,
    title: string,
    projectStatusId: number,
    projectPriority: string,
    assignedTo: string,
    originalEst: number,
    remainingEst: number,
    startDate: Date,
    endDate: Date
    totalWorkDone: number,
}
export interface WorkGroup {
    workGroupId: bigint,
    title: string,
    startDate: Date | null,
    endDate: Date | null
}
export interface WorkGroupProjectStatus {
    projectStatusId: number,
    statusCount: number | null
}
export interface WorkLog {
    projectWorkId: bigint,
    title: string,
    startDate: Date,
    endDate: Date,
    originalEstTime: number,
    remainingEstTime: number,
    assignedTo: string,
    workPriority: string,
    projectStatusId: number,
    createdAt: Date
    totalWorkDone: number
}
export interface updateWorkLogStatusRequest {
    projectStatusId: number,
    projectWorkId: string,
    StartDate: Date | null,
    endDate: Date | null,
    employeeId: string | null,
    projectId: string | null,
    subProjectId: string | null,
    title: string | null,
    workGroupId: string | null,
    workFlow: number | null,
    priority: string | null,
    originalEstTime: number | null,
    remainingEstTime: number | null,
    assignedEmployeeId: number | null,
    reportedEmployeeId: number | null,
    releasedToProduction: Boolean | null,
    rsi: number | null,
    description: string | null
}
export interface getWorkRequest {
    workGroupId: string,
    searchText: string | null,
    projectType: string | null,
    projectStatus: string | null,
    assignedPersonId: string | null,
    expression: string,
    isSortByAsc: Boolean
}
export interface addWorkLogRequest {
    projectWorkId: string,
    workDoneOn: Date,
    workTime: number,
    description: string | null
}
export interface updateProjectWorkItemRequest {
    projectWorkId: string,
    totalTime: number,
    remaningTime: number
}
export interface addWorkItemRequest {
    employeeId: string,
    projectId: string,
    subProjectId: bigint | null,
    title: string,
    workGroupId: string,
    workFlow: number,
    priority: string,
    projectStatusId: number,
    startDate: Date,
    endDate: Date,
    originalEstTime: number,
    remainingEstTime: number,
    assignedEmployeeId: string,
    reportedEmployeeId: string,
    releasedToProduction: Boolean,
    rsi: number,
    description: string | null
}
export interface updateWorkItemRequest {
    projectWorkId: string,
    employeeId: string,
    projectId: string,
    subProjectId: bigint | null,
    title: string,
    workGroupId: string,
    workFlow: number,
    priority: string,
    projectStatusId: number,
    startDate: Date,
    endDate: Date,
    originalEstTime: number,
    remainingEstTime: number,
    assignedEmployeeId: string,
    reportedEmployeeId: string,
    releasedToProduction: Boolean,
    rsi: number,
    description: string | null
}
export interface employeeInfo {
    profileImage: string | null,
    firstName: string | null,
    lastName: string | null
}
export interface workItem {
    title: string | null,
    workGroupId: string | null,
    workFlow: number | null,
    priority: string | null,
    projectStatusId: number | null,
    startDate: Date | null,
    endDate: Date | null,
    originalEstTime: number | null,
    remainingEstTime: number | null,
    totalWorkDone: number | null,
    assignedEmployeeId: string | null,
    reportedEmployeeId: string | null,
    subProjectId: string | null,
    releasedToProduction: Boolean | null,
    rsi: number | null,
    description: string | null,
    createdAt: Date | null,
    updateAt: Date | null
}
export interface ProjectStatusState {
    workItemStateId: string,
    projectStatusId: number,
    employee: string,
    createdAt: Date
}
export interface AddCommentsRequest {
    projectWorkId: string,
    employeeId: string,
    comments: string
}
export interface WorkItemComments {
    comments: string
    createdAt: Date
    employee: string
    workItemCommentId: string
}
export interface WorkItemHistoryRequest {
    workItemId: string,
    pageNumber: number,
    pageSize: number,
    expression: string | null,
    isSortByAsc: Boolean
}
export interface WorkItemHistory {
    rowNum: string | null,
    field: string | null,
    changedBy: string | null,
    changedOn: Date | null,
    oldValue: string | null,
    newValue: string | null
}
export interface WorkItemLog {
    workLogId: string,
    title: string | null,
    workDoneOn: Date,
    workedHours: number,
    employee: string,
    description: string | null
}
export interface UpdateWorkLogRequest {
    workLogId: string,
    workDoneOn: Date,
    workTime: number,
    description: string | null
}
export interface ProjectWorkAttchments {
    workItemAttachmentsId: string,
    fileName: string | null,
    filePath: string,
    filetype: string,
    description: string,
    createdAt: string
}
export interface TeamRosTerResponce {
    employeeName: string,
    capacity: number,
    assignedWork: number,
    remaningWork: number,
    presentageComplete: number,
    presentageAllocation: number
}
export interface ActivityStreamRequest {
    employeeId: string,
    numberOfClicks: number | null
}
export interface ActivityStreamResponce {
    workItemHistoryId: string,
    projectWorkId: string,
    title: string,
    field: string,
    employeeName: string,
    oldValue: number,
    newValue: number,
    titleDate: string,
    updateAt: Date
}
export interface WorkGroupLogsRequest {
    workGroupId: string,
    pageNumber: number,
    pageSize: number,
    expression: string | null,
    isSortByAsc: Boolean
}
export interface WorkGroupLogsResponce {
    rowNum: number,
    projectWorkId: string,
    workLogId: string,
    projectStatusId: number,
    title: string | null,
    employee: string | null,
    workDoneOn: Date,
    workedHours: number
}
export interface ProjectBackLogFormProjectIdRequest {
    projectId: string | null,
    assignedPersonId: string | null,
    expression: string | null,
    isSortByAsc: boolean | null
}