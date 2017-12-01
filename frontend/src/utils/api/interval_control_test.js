import axios from 'axios';
import tokenConfig from '../axios';

export function interval_test(token) {
    return axios.get('/api/interval_control_test/interval_test', tokenConfig(token));
}

export function prev_interval_test(token) {
    return axios.get('/api/interval_control_test/prev_interval_test', tokenConfig(token));
}