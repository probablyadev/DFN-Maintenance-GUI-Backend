import request from '../request';

function intervalTest(token) {
    return request({
        url: '/intervalControlTest/intervalTest',
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function prevIntervalTest(token) {
    return request({
        url: '/intervalControlTest/prevIntervalTest',
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

const IntervalControlTestAPIService = {
    intervalTest, prevIntervalTest
};

export default IntervalControlTestAPIService;
