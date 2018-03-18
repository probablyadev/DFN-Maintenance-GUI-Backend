import request from '../request';

function getUser(token) {
    return request({
        url: `/user/getUser`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function getToken(email, password) {
    return request({
        url: '/user/getToken',
        method: 'POST',
        data: {
            email,
            password
        }
    });
}

function isTokenValid(token) {
    return request({
        url: '/user/isTokenValid',
        method: 'POST',
        data: {
            token
        }
    });
}

const UserAPIService = {
    getUser, getToken, isTokenValid
};

export default UserAPIService;
