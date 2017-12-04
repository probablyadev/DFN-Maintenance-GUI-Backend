import axios from 'axios';
import tokenConfig from '../axios';

export function check_config_file(token) {
    return axios.get('/api/config_file/check_config_file', tokenConfig(token));
}

export function config_whitelist(token) {
    return axios.get('/api/config_file/config_whitelist', tokenConfig(token));
}

export function config_file(token) {
    return axios.get('/api/config_file/config_file', tokenConfig(token));
}

export function update_config_file(token, property) {
    return axios.post('/api/config_file/update_config_file',
        {
            property
        },
        tokenConfig(token)
    );
}
