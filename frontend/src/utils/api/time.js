import axios from 'axios';
import tokenConfig from '../axios';

export function output_time(token) {
    return axios.get('/api/time/output_time', tokenConfig(token));
}

export function change_timezone(token) {
    return axios.post('/api/time/change_timezone',
        {
            timezone
        },
        tokenConfig(token)
    );
}
