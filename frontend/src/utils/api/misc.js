import axios from 'axios';
import tokenConfig from '../axios';

export function get_hostname(token) {
    return axios.get('/api/misc/get_hostname', tokenConfig(token));
}
