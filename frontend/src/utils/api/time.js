import axios from 'axios';
import tokenConfig from '../request';

export function outputTime(token) {
    return axios.get('/api/time/output_time', tokenConfig(token));
}

export function changeTimezone(token) {
    return axios.post('/api/time/change_timezone',
        {
            timezone
        },
        tokenConfig(token)
    );
}
