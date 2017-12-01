import axios from 'axios';
import tokenConfig from '../axios';

export function config_file_check(token) {
    return axios.get('/api/config_file/config_file_check', tokenConfig(token));
}