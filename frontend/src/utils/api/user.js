import axios from 'axios';
import tokenConfig from '../axios';

export function getUser(token) {
    return axios.get('/api/user/get_user', tokenConfig(token));
}

export function getToken(email, password) {
    return axios.post('/api/user/get_token', {
        email,
        password,
    });
}

export function isTokenValid(token) {
    return axios.post('/api/user/is_token_valid', {
        token,
    });
}
