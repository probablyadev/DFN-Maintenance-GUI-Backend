import axios from 'axios';
import tokenConfig from '../axios';

export function checkHDD(token) {
    return axios.get('/api/hdd/check_hdd', tokenConfig(token));
}

export function enableHDD(token) {
    return axios.get('/api/hdd/enable_hdd', tokenConfig(token));
}

export function formatHDD(token, args) {
    return axios.post('/api/hdd/format_hdd',
        {
            args
        },
        tokenConfig(token)
    );
}

export function mountHDD(token) {
    return axios.get('/api/hdd/mount_hdd', tokenConfig(token));
}

export function moveData0HDD(token) {
    return axios.get('/api/hdd/move_data_0_hdd', tokenConfig(token));
}

export function probeHDD(token) {
    return axios.get('/api/hdd/probe_hdd', tokenConfig(token));
}

export function smartTest(token) {
    return axios.get('/api/hdd/smart_test', tokenConfig(token));
}

export function unmountHDD(token) {
    return axios.get('/api/hdd/unmount_hdd', tokenConfig(token));
}
