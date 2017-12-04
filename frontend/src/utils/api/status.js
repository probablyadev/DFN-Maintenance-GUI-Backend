import axios from 'axios';
import tokenConfig from '../axios';

export function latest_log(token) {
    return axios.get('/api/status/latest_log', tokenConfig(token));
}

export function second_latest_log(token) {
    return axios.get('/api/status/second_latest_log', tokenConfig(token));
}
