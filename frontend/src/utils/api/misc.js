import axios from 'axios';
import tokenConfig from '../axios';

export function getHostname(token) {
    return axios.get('/api/misc/get_hostname', tokenConfig(token));
}
