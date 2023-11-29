// import {axiosInstance} from '../../config/utility';
import  axiosInstance  from "../../config/axios";

export const getProjectBackLog = (payload) => {
    return axiosInstance.post('/api/Project/GetProjectBackLog', payload);
}

export const addProjectBackLog = (payload) => {
    return axiosInstance.post('/api/Project/AddWorkItem', payload);
}

export const getProjectBacklogInfo = (id) => {
    return axiosInstance.get('/api/Project/GetProjectWorkItem?projectWorkId=' + id)
}

export const updateProjectBackLog = (payload) => {
    return axiosInstance.put('/api/Project/UpdateWorkItem', payload);
}

export const deleteProjectBackLog = (id) => {
    return axiosInstance.delete('/api/Project/DeleteWorkItem?id=' + id);
}

export const getEmployeeList = () => {
    return axiosInstance.get('/api/EmplyeeDetails/EmployeeNameAndId');
}

export const getWorkGroup = (id) => {
    return axiosInstance.get('/api/Project/GetWorkGroups?projectId=' + id);
}

export const getWorkGroupStatusCount = (id) => {
    return axiosInstance.get('/api/Project/GetprojectStatusCount?projectId=' + id);
}

export const getWorkGroupItemStatusCount = (projectId, workGroupId) => {
    return axiosInstance.get('/api/Project/GetprojectStatusCount?projectId=' + projectId + '&workGroupId=' + workGroupId);
}

export const getProjectWorkgroup = (id) => {
    return axiosInstance.get('/api/Project/GetAllWorkGroup?projectId=' + id);
}

export const getWorkLog = (payload) => {
    return axiosInstance.post('api/Project/GetWorkLog', payload);
}

export const getWorkGroupInfo = (id) => {
    return axiosInstance.get('api/Project/GetWorkGroupFromId?workGroupId=' + id);
}

export const updateWorkLog = (payload) => {
    return axiosInstance.put('api/Project/UpdateWorkItem', payload);
}

export const addWorkLog = (payload) => {
    return axiosInstance.post('api/Project/AddWorkLog', payload);
}

export const updateProjectWorkItemTime = (payload) => {
    return axiosInstance.put('api/Project/UpdateProjectWorkItemTime', payload);
}