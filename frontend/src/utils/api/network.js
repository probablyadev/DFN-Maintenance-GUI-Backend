import axios from 'axios';
import tokenConfig from '../axios';

export function check_vpn(token) {
    return axios.get('/api/network/check_vpn', tokenConfig(token));
}

export function check_internet(token) {
    return axios.get('/api/network/check_internet', tokenConfig(token));
}

export function restart_modem(token) {
    return axios.get('/api/network/restart_modem', tokenConfig(token));
}

export function restart_vpn(token) {
    return axios.get('/api/network/restart_vpn', tokenConfig(token));
}
