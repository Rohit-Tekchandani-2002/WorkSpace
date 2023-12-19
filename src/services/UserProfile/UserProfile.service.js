// import {axiosInstance} from '../../config/utility';
import  axiosInstance  from "../../config/axios";

export const getUserInfo = (id) => {
    return axiosInstance.get('/api/EmplyeeDetails/EmployeeInfo?employeeId=' + id);
}

export const updatePasswords = (payload) => {
    return axiosInstance.put('api/EmplyeeDetails/ChangePassword', payload);
}

export const updateNotificationSetting = (payload) => {
    return axiosInstance.put('api/EmplyeeDetails/ChageNotificationSetting', payload);
}

export const getSystemConfiguration = (id) => {
    return axiosInstance.get('api/EmplyeeDetails/GetSystemConfiguration?employeeId=' + id);
} 

export const getPersonalDetails = (id) => {
    return axiosInstance.get('api/EmplyeeDetails/GetEmployeePresonalInfo?employeeId=' + id);
}

export const getTravelInfo = (id) => {
    return axiosInstance.get('api/EmplyeeDetails/GetEmployeeTravelInfo?employeeId=' + id);
}

export const createCountryVisaInfo = (payload) => {
    return axiosInstance.post('api/EmplyeeDetails/CreateCountryVisaInfo', payload);
}

export const updateCountryVisaInfo = (payload) => {
    return axiosInstance.put('api/EmplyeeDetails/UpdateCountryVisaInfo', payload);
}

export const deleteCountryVisaInfo = (id) => {
    return axiosInstance.delete('api/EmplyeeDetails/DeleteCountryVisaInfo?visaInfoId=' + id);
}

export const updatePersonalInfo = (payload) => {
    return axiosInstance.put('/api/EmplyeeDetails/UpdatePersonalInfo', payload);
} 