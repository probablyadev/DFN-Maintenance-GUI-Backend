import request from '../request';

function checkConfigFile(token) {
    return request({
        url: `/configFile/checkConfigFile`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function configWhitelist(token) {
    return request({
        url: `/configFile/configWhitelist`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function configFile(token) {
    return request({
        url: `/configFile/configFile`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function updateConfigFile(token, property) {
    return request({
        url: `/configFile/updateConfigFile`,
        method: 'POST',
        headers: {
            'Authorization': token
        },
        data: {
            property
        }
    });
}

const ConfigFileAPIService = {
    checkConfigFile, configWhitelist, configFile, updateConfigFile
};

export default ConfigFileAPIService;
