import  axiosInstance  from "../../config/axios";

export const getTraineeTraningResponce = (payload) => {
    return axiosInstance.post('api/Traning/GetTraineeTraningResponce', payload);
}

export const getTranineeTraningFeedBack = (employeeId, traningId) => {
    return axiosInstance.get(`api/Traning/GetTranineeTraningFeedBack?employeeId=${employeeId}&traningId=${traningId}`);
}

export const updateTraineeTraningFeedBack = (payload) => {
    return axiosInstance.put('api/Traning/UpdateTraineeTraningFeedBack', payload);
}