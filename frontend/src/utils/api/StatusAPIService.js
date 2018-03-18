import request from '../request';

function latestLog(token) {
    return request({
        url: `/status/latestLog`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function secondLatestLog(token) {
    return request({
        url: `/status/secondLatestLog`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

const StatusAPIService = {
    latestLog, secondLatestLog
};

export default StatusAPIService;
