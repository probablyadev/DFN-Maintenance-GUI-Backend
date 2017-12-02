import axios from 'axios';
import tokenConfig from '../axios';

export function camera_off(token) {
    return axios.get('/api/camera/camera_off', tokenConfig(token));
}

export function camera_on(token) {
    return axios.get('/api/camera/camera_on', tokenConfig(token));
}

export function camera_status(token) {
    return axios.get('/api/camera/camera_status', tokenConfig(token));
}

export function download_picture(token, file) {
    return axios.post('/api/camera/download_picture',
        {
            file
        },
        tokenConfig(token)
    );
}

export function download_thumbnail(token) {
    return axios.post('/api/camera/download_thumbnail',
        {
            file
        },
        tokenConfig(token)
    );
}

export function find_pictures(token) {
    return axios.post('/api/camera/find_pictures',
        {
            date
        },
        tokenConfig(token)
    );
}

export function remove_thumbnail(token) {
    return axios.post('/api/camera/remove_thumbnail',
        {
            path
        },
        tokenConfig(token)
    );
}

export function turn_video_camera_off(token) {
    return axios.get('/api/camera/turn_video_camera_off', tokenConfig(token));
}

export function turn_video_camera_on(token) {
    return axios.get('/api/camera/turn_video_camera_on', tokenConfig(token));
}
