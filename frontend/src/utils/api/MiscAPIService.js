import request from '../request';

function getHostname(token) {
    return request({
        url: `/misc/getHostname`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

const MiscAPIService = {
    getHostname
};

export default MiscAPIService;
