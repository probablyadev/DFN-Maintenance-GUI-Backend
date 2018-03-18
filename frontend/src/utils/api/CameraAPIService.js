import request from '../request';

function cameraOff(token) {
    return request({
        url: `/camera/cameraOff`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function cameraOn(token) {
    return request({
        url: `/camera/cameraOn`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function cameraStatus(token) {
    return request({
        url: `/camera/cameraStatus`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function downloadPicture(token, file) {
    return request({
        url: `/camera/downloadPicture`,
        method: 'POST',
        headers: {
            'Authorization': token
        },
        data: {
            file
        }
    });
}

function downloadThumbnail(token, file) {
    return request({
        url: `/camera/downloadThumbnail`,
        method: 'POST',
        headers: {
            'Authorization': token
        },
        data: {
            file
        }
    });
}

function findPictures(token, date) {
    return request({
        url: `/camera/findPictures`,
        method: 'POST',
        headers: {
            'Authorization': token
        },
        data: {
            date
        }
    });
}

function removeThumbnail(token, path) {
    return request({
        url: `/camera/removeThumbnail`,
        method: 'POST',
        headers: {
            'Authorization': token
        },
        data: {
            path
        }
    });
}

function turnVideoCameraOff(token) {
    return request({
        url: `/camera/turnVideoCameraOff`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

function turnVideoCameraOn(token) {
    return request({
        url: `/camera/turnVideoCameraOn`,
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
}

const CameraAPIService = {
    cameraOff, cameraOn, cameraStatus, downloadPicture, downloadThumbnail, findPictures, removeThumbnail, turnVideoCameraOff, turnVideoCameraOn
};

export default CameraAPIService;
