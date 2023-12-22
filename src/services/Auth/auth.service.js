// import { apiEndpoint } from "../../config/config.js";
// import { HandelError } from "../../config/utility.js";
import _ from "lodash";
import axiosInstance from "../../config/axios.js";

// export const authLogin = async (payload) => {
//     let response = false;
//     await fetch(apiEndpoint + '/api/Accounts/Login', {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     }).then((response) => response.json()
//     ).then((data) => {
//             HandelError.InternalError(_.get(data,'isError'), _.get(data,'errorMessage'));
//             if (!_.get(data, 'isError')) {
//                 response = true;
//                 if (data) {
//                     let loginResponse = {
//                         employeeId: '',
//                         refreshToken: '',
//                         refreshTokenExpiryTime: '',
//                         token: '',
//                         tokenExpiryTime: ''
//                     };
//                     loginResponse = _.get(data, 'responce');
//                     localStorage.clear();
//                     if (_.get(loginResponse, 'employeeId') !== '') {
//                         localStorage.setItem('employeeId', _.get(loginResponse, 'employeeId'));
//                     }
//                     if (_.get(loginResponse, 'token') !== '') {
//                         localStorage.setItem('token', _.get(loginResponse,'token'));
//                     }
//                     if (_.get(loginResponse, 'tokenExpiryTime') !== '') {
//                         localStorage.setItem('tokenExpiryTime', _.get(loginResponse,'tokenExpiryTime'));
//                     }
//                     if (_.get(loginResponse, 'refreshToken') !== '') {
//                         localStorage.setItem('refreshToken', _.get(loginResponse,'refreshToken'));
//                     }
//                     if (_.get(loginResponse, 'refreshTokenExpiryTime') !== '') {
//                         localStorage.setItem('refreshTokenExpiryTime', _.get(loginResponse,'refreshTokenExpiryTime'));
//                     }
//                 }
//             }
//         })
//         .catch((err) => {
//             HandelError.Error(err);
//         });
//     return response;
// }

// export const refershToken = (payload) => {
//     let api_key = localStorage.getItem('token');
//     let response = false;
//     fetch(apiEndpoint + '/api/Accounts/RefershToken', {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//             'Authorization': `Bearer ${api_key}`
//         },
//     }).then((response) => response.json())
//         .then((data) => {
//             HandelError.InternalError(_.get(data,'isError'), _.get(data,'errorMessage'));
//             if (!_.get(data, 'isError')) {
//                 response = true;
//                 if (data) {
//                     let loginResponse = {
//                         employeeId: '',
//                         refreshToken: '',
//                         refreshTokenExpiryTime: '',
//                         token: '',
//                         tokenExpiryTime: ''
//                     };
//                     loginResponse = _.get(data, 'responce');
//                     localStorage.clear();
//                     if (_.get(loginResponse, 'employeeId') !== '') {
//                         localStorage.setItem('employeeId', _.get(loginResponse, 'employeeId'));
//                     }
//                     if (_.get(loginResponse, 'token') !== '') {
//                         localStorage.setItem('token', _.get(loginResponse,'token'));
//                     }
//                     if (_.get(loginResponse, 'tokenExpiryTime') !== '') {
//                         localStorage.setItem('tokenExpiryTime', _.get(loginResponse,'tokenExpiryTime'));
//                     }
//                     if (_.get(loginResponse, 'refreshToken') !== '') {
//                         localStorage.setItem('refreshToken', _.get(loginResponse,'refreshToken'));
//                     }
//                     if (_.get(loginResponse, 'refreshTokenExpiryTime') !== '') {
//                         localStorage.setItem('refreshTokenExpiryTime', _.get(loginResponse,'refreshTokenExpiryTime'));
//                     }
//                 }
//             }
//         })
//         .catch((err) => {
//             HandelError.Error(err);
//         });
//     return response;
// }

export const authLogin = async (payload) => {
    let response = {isValid: false, error: { message: 'Internal Error', code: 'Error'}};
    let data = await axiosInstance.post('/api/Accounts/Login', payload).catch((error) => {
        console.log('login error', error);
        if (_.get(error, 'response.data.errorMessage', null)) {
            _.set(response, 'error.message', _.get(error, 'response.data.errorMessage', 'Internal Error'));
        } else {
            _.set(response, 'error.message', _.get(error, 'message', 'Internal Error'));
        }
        _.set(response, 'error.code', _.get(error, 'code', 'Error'));
    })

    if (data) {
        _.set(response, 'isValid', true);
        let loginResponse = {
            employeeId: '',
            refreshToken: '',
            refreshTokenExpiryTime: '',
            token: '',
            tokenExpiryTime: ''
        };
        loginResponse = data;
        localStorage.clear();
        if (_.get(loginResponse, 'employeeId') !== '') {
            localStorage.setItem('employeeId', _.get(loginResponse, 'employeeId'));
        }
        if (_.get(loginResponse, 'token') !== '') {
            localStorage.setItem('token', _.get(loginResponse, 'token'));
        }
        if (_.get(loginResponse, 'tokenExpiryTime') !== '') {
            localStorage.setItem('tokenExpiryTime', _.get(loginResponse, 'tokenExpiryTime'));
        }
        if (_.get(loginResponse, 'refreshToken') !== '') {
            localStorage.setItem('refreshToken', _.get(loginResponse, 'refreshToken'));
        }
        if (_.get(loginResponse, 'refreshTokenExpiryTime') !== '') {
            localStorage.setItem('refreshTokenExpiryTime', _.get(loginResponse, 'refreshTokenExpiryTime'));
        }
    }
    return response;
}
