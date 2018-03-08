import axios from 'axios';
import tokenConfig from '../axios';

export function get_user(token) {
    return axios.get('/api/user/get_user', tokenConfig(token));
}

export function get_token(email, password) {
    return axios.post('/api/user/get_token', {
        email,
        password,
    });
}

export function is_token_valid(token) {
    return axios.post('/api/user/is_token_valid', {
        token,
    });
}
