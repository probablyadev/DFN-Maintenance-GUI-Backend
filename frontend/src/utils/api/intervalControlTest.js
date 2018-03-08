import axios from 'axios';
import tokenConfig from '../axios';

export function intervalTest(token) {
    return axios.get('/api/interval_control_test/interval_test', tokenConfig(token));
}

export function prevIntervalTest(token) {
    return axios.get('/api/interval_control_test/prev_interval_test', tokenConfig(token));
}
