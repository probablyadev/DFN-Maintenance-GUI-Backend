import axios from 'axios';
import tokenConfig from '../request';

export function cameraOff(token) {
    return axios.get('/api/camera/camera_off', tokenConfig(token));
}

export function cameraOn(token) {
    return axios.get('/api/camera/camera_on', tokenConfig(token));
}

export function cameraStatus(token) {
    return axios.get('/api/camera/camera_status', tokenConfig(token));
}

export function downloadPicture(token, file) {
    return axios.post('/api/camera/download_picture',
        {
            file
        },
        tokenConfig(token)
    );
}

export function downloadThumbnail(token) {
    return axios.post('/api/camera/download_thumbnail',
        {
            file
        },
        tokenConfig(token)
    );
}

export function findPictures(token) {
    return axios.post('/api/camera/find_pictures',
        {
            date
        },
        tokenConfig(token)
    );
}

export function removeThumbnail(token) {
    return axios.post('/api/camera/remove_thumbnail',
        {
            path
        },
        tokenConfig(token)
    );
}

export function turnVideoCameraOff(token) {
    return axios.get('/api/camera/turn_video_camera_off', tokenConfig(token));
}

export function turnVideoCameraOn(token) {
    return axios.get('/api/camera/turn_video_camera_on', tokenConfig(token));
}
