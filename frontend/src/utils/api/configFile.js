import axios from 'axios';
import tokenConfig from '../axios';

export function checkConfigFile(token) {
    return axios.get('/api/config_file/check_config_file', tokenConfig(token));
}

export function configWhitelist(token) {
    return axios.get('/api/config_file/config_whitelist', tokenConfig(token));
}

export function configFile(token) {
    return axios.get('/api/config_file/config_file', tokenConfig(token));
}

export function updateConfigFile(token, property) {
    return axios.post('/api/config_file/update_config_file',
        {
            property
        },
        tokenConfig(token)
    );
}
