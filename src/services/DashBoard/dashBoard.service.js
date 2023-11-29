// import { axiosInstance } from "../../config/utility";
import  axiosInstance  from "../../config/axios";

export const getNewsAndUpdates = () => {
    return axiosInstance.get('/api/DashBoard/GetnewsAndUpdates');
}

export const getDashBoardInfo = (id) => {
    return axiosInstance.get('/api/DashBoard/GetDashBoardInfo?employeeId=' + id);
} 

export const getWidgetMyRecentProjects = (id) => {
    return axiosInstance.get('/api/DashBoard/GetWidgetMyRecentProjects?employeeId=' + id);
} 

export const getWidgetActiveWorkGroups = (id) => {
    return axiosInstance.get('/api/DashBoard/GetWidgetActiveWorkGroup?employeeId=' + id);
} 

export const getWidgetTeamWorkItems = (id) => {
    return axiosInstance.get('/api/DashBoard/GetWidgetTeamWorkItems?employeeId=' + id);
} 

export const getWidgetPendingTraningFeedBack = (id) => {
    return axiosInstance.get('/api/DashBoard/GetWidgetPendingTraningFeedBack?employeeId=' + id);
} 
