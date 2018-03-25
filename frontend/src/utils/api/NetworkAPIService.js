import request from '../request';

function checkVPN(token) {
    return request({
        url: `/network/checkVPN`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function checkInternet(token) {
    return request({
        url: `/network/checkInternet`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function restartModem(token) {
    return request({
        url: `/network/restartModem`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function restartVPN(token) {
    return request({
        url: `/network/restartVPN`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

const NetworkAPIService = {
    checkVPN, checkInternet, restartModem, restartVPN
};

export default NetworkAPIService;
