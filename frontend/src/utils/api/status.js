import axios from 'axios';
import tokenConfig from '../request';

export function latestLog(token) {
    return axios.get('/api/status/latest_log', tokenConfig(token));
}

export function secondLatestLog(token) {
    return axios.get('/api/status/second_latest_log', tokenConfig(token));
}
