export interface getTimeSheetRequest {
    employeeId: string,
    month: number | null,
    year: number | null
}
export interface TimeSheet {
    currentDate: Date | null,
    currentWeekDay: string | null
}
export interface WorkDoneItem{
    workDoneOn: Date,
    workTime: number
}
export interface LogDateItem{
    logDate: Date,
    timeLog: number
}