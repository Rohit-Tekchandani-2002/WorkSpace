export interface getMyMonthlyTimeLogRequest {
    employeeId: string,
    month: number | null,
    year: number | null
}
export interface getMyYearlyTimeLogRequest {
    employeeId: string,
    year: number | null
}
export interface employeeInfo {
    employeeNo: string,
    name: string,
    shift: string,
    experience: number,
    hours: number,
    presentDays: number,
    leaveDays: number,
    halfLeave: number,
    lateDays: number,
    avgTimeLog: number,
    avgWorkLog: number,
    difference: number,
    outHours: number
}
export interface employeeMonthlyLog {
    date: string,
    lateComer: boolean | null,
    firstInTime: number,
    lastOutTime: number,
    totalOutHours: number,
    workLog: number
}
export interface timelogHover {
    date: string,
    timein: number,
    timeout: number,
    outHrs: number,
    workHrs: number
}
export interface employeeYearlyLog {
    employeeNo: string,
    name: string,
    month: string,
    hours: number,
    pDays: number,
    lDays: number,
    halfLeaves: number,
    lateDays: number,
    avgTimeLog: number,
    avgWorkLog: number,
    difference: number,
    outHours: number
}