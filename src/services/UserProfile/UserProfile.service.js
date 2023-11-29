// import {axiosInstance} from '../../config/utility';
import  axiosInstance  from "../../config/axios";

export const getUserInfo = (id) => {
    return axiosInstance.get('/api/EmplyeeDetails/EmployeeInfo?employeeId=' + id);
}