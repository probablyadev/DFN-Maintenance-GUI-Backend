import axios from 'axios';
import tokenConfig from '../axios';

export function check_hdd(token) {
    return axios.get('/api/hdd/check_hdd', tokenConfig(token));
}

export function enable_hdd(token) {
    return axios.get('/api/hdd/enable_hdd', tokenConfig(token));
}

export function format_hdd(token, args) {
    return axios.post('/api/hdd/format_hdd',
        {
            args
        },
        tokenConfig(token)
    );
}

export function mount_hdd(token) {
    return axios.get('/api/hdd/mount_hdd', tokenConfig(token));
}

export function move_data_0_hdd(token) {
    return axios.get('/api/hdd/move_data_0_hdd', tokenConfig(token));
}

export function probe_hdd(token) {
    return axios.get('/api/hdd/probe_hdd', tokenConfig(token));
}

export function smart_test(token) {
    return axios.get('/api/hdd/smart_test', tokenConfig(token));
}

export function unmount_hdd(token) {
    return axios.get('/api/hdd/unmount_hdd', tokenConfig(token));
}
