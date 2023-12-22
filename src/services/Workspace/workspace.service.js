import  axiosInstance  from "../../config/axios";

export const getHoliday = () => {
    return axiosInstance.get('api/Attendance/HolidayList');
}

export const getAttendance = (payload) => {
    return axiosInstance.post('api/Attendance/GetAttendance', payload);
}

export const addAttendance = (payload) => {
    return axiosInstance.post('api/Attendance/AddOrUpdateAttendance', payload);
}

export const getProjectTech = () => {
    return axiosInstance.get('api/Project/GetProjectTech');
}

export const getProjects = (payload) => {
    return axiosInstance.post('api/Project/GetProjects', payload);
}

export const getWorkItems = (payload) => {
    return axiosInstance.post('api/Project/GetWorkBackLogFromProjectId', payload);
}

export const getMonthlyTimeLog = (payload) => {
    return axiosInstance.post('api/WorkSpace/GetMyMonthlyTimeLogs', payload);
}

export const getYearlyTimeLog = (payload) => {
    return axiosInstance.post('api/WorkSpace/GetMyYearlyTimeLog', payload);
}

export const getTimeSheet = (payload) => {
    return axiosInstance.post('api/Project/GetTimeSheet', payload);
}

export const getMonthlyTimeSheet = (payload) => {
    return axiosInstance.post('api/Project/GetTimeSheetDailyTimeLogEmployeeAndDate', payload);
}

export const getLeaveRequestDetails = (payload) => {
    return axiosInstance.post('api/WorkSpace/GetLeaveRequestDetails', payload);
}

export const getServiceDetails = (payload) => {
    return axiosInstance.post('api/WorkSpace/GetServiceDetails', payload);
}

export const getleaveRequestEmployeeInfo = (payload) => {
    return axiosInstance.post('api/WorkSpace/GetLeaveRequestEmployeeInfo', payload);
}

export const deleteLeaveRequest = (employeeId, leaverequestId) => {
    return axiosInstance.delete(`api/WorkSpace/DeleteLeaveRequest?EmployeeId=${employeeId}&LeaveRequestId=${leaverequestId}`);
}

export const addLeaveRequest = (payload) => {
    return axiosInstance.post('/api/WorkSpace/AddLeaveRequest', payload);
}

export const getAddedLeaveRequest = (id) => {
    return axiosInstance.get(`api/WorkSpace/GetUpdateLeaveRequest?LeaveRequestId=${id}`);
}

export const updateAddedLeaveRequest = (payload) => {
    return axiosInstance.put('api/WorkSpace/UpdateLeaveRequest', payload);
}

export const serviceRequestDropDown = (payload) => {
    return axiosInstance.post('api/WorkSpace/ServiceRequestDropDown', payload);
}

export const addServiceRequest = (payload) => {
    return axiosInstance.post('api/WorkSpace/AddServiceRequest', payload);
}

export const getUpdateServiceRequest = (id) => {
    return axiosInstance.get(`api/WorkSpace/GetServiceRequestUpdateDetails?ServiceRequestId=${id}`);
}

export const updateServiceRequest = (payload) => {
    return axiosInstance.put('api/WorkSpace/UpdateServiceRequest', payload);
}