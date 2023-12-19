import { apiEndpoint } from "./config";
import { SESSION_EXPIRED } from "../constants/constants";
// import { refershToken } from "../services/Auth/auth.service";
import _ from "lodash";

var api_key = localStorage.getItem('token');

// export const axiosInstance = {
//     get: async (api) => {
//         let response = null;
//         await fetch(apiEndpoint + api, {
//             method: 'GET',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 'Authorization': `Bearer ${api_key}`
//             },
//         }).then((response) => response.json())
//             .then((data) => {
//                 if (!data.isError) {
//                     response = _.get(data, 'responce', null);
//                 }
//                 else {
//                     HandelError.InternalError(data.isError, data.errorMessage);
//                 }
//             });
//         return response;
//     },
//     post: async (api, payload) => {
//         let response = null;
//         await fetch(apiEndpoint + api, {
//             method: 'POST',
//             body: JSON.stringify(payload),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 'Authorization': `Bearer ${api_key}`
//             },
//         }).then((response) => response.json())
//             .then((data) => {
//                 if (!data.isError) {
//                     response = _.get(data, 'responce', null);
//                 }
//                 else {
//                     HandelError.InternalError(data.isError, data.errorMessage);
//                 }
//             });
//         return response;
//     },
//     put: async (api, payload) => {
//         let response = null;
//         await fetch(apiEndpoint + api, {
//             method: 'PUT',
//             body: JSON.stringify(payload),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 'Authorization': `Bearer ${api_key}`
//             },
//         }).then((response) => response.json())
//             .then((data) => {
//                 if (!data.isError) {
//                     response = _.get(data, 'responce', null);
//                 }
//                 else {
//                     HandelError.InternalError(data.isError, data.errorMessage);
//                 }
//             });
//         return response;
//     },
//     delete: async (api) => {
//         let response = null;
//         await fetch(apiEndpoint + api, {
//             method: 'DELETE',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 'Authorization': `Bearer ${api_key}`
//             },
//         }).then((response) => response.json())
//             .then((data) => {
//                 if (!data.isError) {
//                     response = _.get(data, 'responce', null);
//                 }
//                 else {
//                     HandelError.InternalError(data.isError, data.errorMessage);
//                 }
//             });
//         return response;
//     }
// }

// export const HandelError = {
//     InternalError: async function (isError, errorMessage) {
//         if (isError) {
//             console.log(errorMessage);
//         }
//     },
//     Error401: async () => {
//         try {
//             const refreshTokenExpiryTimeStr = localStorage.getItem('refreshTokenExpiryTime');
//             if (refreshTokenExpiryTimeStr && refreshTokenExpiryTimeStr !== 'undefined') {
//                 const currentTime = new Date();
//                 const refreshTokenExpiryTime = new Date(refreshTokenExpiryTimeStr);
//                 const refreshToken = localStorage.getItem('refreshToken');

//                 if (refreshToken && refreshTokenExpiryTime > currentTime) {
//                     const tokenExpiryTimeStr = localStorage.getItem('tokenExpiryTime');
//                     const tokenExpiryTime = new Date(tokenExpiryTimeStr);

//                     if (currentTime > tokenExpiryTime) {
//                         const payload = {
//                             refreshToken: refreshToken
//                         };
//                         const isRefreshed = await refershToken(payload);

//                         if (isRefreshed) {
//                             return true;
//                         }
//                     }
//                 } else {
//                     localStorage.clear();
//                     return false;
//                 }
//             } else {
//                 localStorage.clear();
//                 return false;
//             }
//         } catch (error) {
//             console.log(error);
//             return false;
//         }
//     },
//     Error: async function (error) {
//         console.log(error);
//     }
// }

export const formatTime = (decimalValue) => {
    const hours = Math.floor(decimalValue);
    const minutes = Math.round((decimalValue - hours) * 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

export const formatDate = (date) => {
    let tempDate = new Date(date);
    let day = tempDate.getDate().toString().padStart(2, '0'); 
    let month = tempDate.toLocaleDateString('en-GB', {month: 'short'}); 
    let year = tempDate.getFullYear();
    let formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}

export const adjustDateTime = (date) => {
    let tempDate = new Date(date);
    let dd = tempDate.getDate().toString().padStart(2, '0');
    let MM = (tempDate.getMonth() + 1).toString().padStart(2, '0');
    let yyyy = tempDate.getFullYear();
    let dateStr = yyyy + '-' + MM + '-' + dd;
    return dateStr;
}
