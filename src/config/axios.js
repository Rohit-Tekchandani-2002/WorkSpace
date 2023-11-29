import axios from "axios";
import { apiEndpoint } from "./config";
import _ from "lodash";

var axiosInstance = axios.create({
    baseURL: apiEndpoint,
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-type'] = `application/json; charset=UTF-8`;
    return config;
},
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return _.get(response, 'data.responce', {});
    },
    async error => {
        switch (_.get(error, 'response.status', '')) {
            case 401:
                window.location.href = '/';
                break;
            default:
                return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;