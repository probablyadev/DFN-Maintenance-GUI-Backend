import request from '../request';

function outputTime(token) {
    return request({
        url: '/time/outputTime',
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function getTimezone(token) {
    return request({
        url: '/time/getTimezone',
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function changeTimezone(token, data) {
    return request({
        url: '/time/changeTimezone',
        method: 'POST',
        headers: {
            'Authorization': token
        },
        data
    });
}

const TimeAPIService = {
    outputTime,
    getTimezone,
    changeTimezone
};

export default TimeAPIService;
