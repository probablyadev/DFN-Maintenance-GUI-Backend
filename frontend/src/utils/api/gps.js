import axios from 'axios';
import tokenConfig from '../axios';

export function gps_check(token) {
    return axios.get('/api/gps/gps_check', tokenConfig(token));
}