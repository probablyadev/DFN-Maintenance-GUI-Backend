import axios from 'axios';
import tokenConfig from '../axios';

export function check_gps(token) {
    return axios.get('/api/gps/check_gps', tokenConfig(token));
}
