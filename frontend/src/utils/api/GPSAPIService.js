import request from '../request';

function checkGPS(token) {
    return request({
        url: `/gps/checkGPS`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

const GPSAPIService = {
    checkGPS
};

export default GPSAPIService;
