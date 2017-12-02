import axios from 'axios';
import tokenConfig from '../axios';

export function output_time(token) {
    return axios.get('/api/time/output_time', tokenConfig(token));
}

export function timezone_change(token) {
    return axios.post('/api/time/timezone_change', 
        {
            timezone
        },
        tokenConfig(token)
    );
}