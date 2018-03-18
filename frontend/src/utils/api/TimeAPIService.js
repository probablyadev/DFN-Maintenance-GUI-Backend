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

function changeTimezone(token, timezone) {
    return request({
        url: '/time/changeTimezone',
        method: 'POST',
        headers: {
            'Authorization': token
        },
        data: {
            timezone
        }
    });
}

const TimeAPIService = {
    outputTime, changeTimezone
};

export default TimeAPIService;
