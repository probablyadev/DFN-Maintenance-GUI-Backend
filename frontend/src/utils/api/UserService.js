import request from '../request';

function getUser(token) {
    return request({
        url: `/user/getUser`,
        method: 'GET',
        headers: {
            'Authorization': token, // eslint-disable-line quote-props
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

const UserService = {
    getUser, getToken, isTokenValid
};

export default UserService;
