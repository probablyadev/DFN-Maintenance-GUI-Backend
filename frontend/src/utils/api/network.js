import axios from 'axios';
import tokenConfig from '../request';

export function checkVPN(token) {
    return axios.get('/api/network/check_vpn', tokenConfig(token));
}

export function checkInternet(token) {
    return axios.get('/api/network/check_internet', tokenConfig(token));
}

export function restartModem(token) {
    return axios.get('/api/network/restart_modem', tokenConfig(token));
}

export function restartVPN(token) {
    return axios.get('/api/network/restart_vpn', tokenConfig(token));
}
