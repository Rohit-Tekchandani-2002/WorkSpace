// import { axiosInstance } from "../../config/utility";
import  axiosInstance  from "../../config/axios";

export const getUserInfo = (id) => {
    return axiosInstance.get('/api/DashBoard/EmployeeInfo?employeeId=' + id);
} 

export const getUserProjects = (id) => {
    return axiosInstance.get('/api/DashBoard/GetUserProjects?employeeId=' + id);
}