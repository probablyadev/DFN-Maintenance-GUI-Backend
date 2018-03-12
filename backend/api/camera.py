from flask import Blueprint, jsonify, request

from backend.auth import requires_auth
from command.camera import *

camera_endpoints = Blueprint("camera_api", __name__)


@camera_endpoints.route("/api/camera/cameraOff", methods = ["GET"])
@requires_auth
def camera_off_endpoint():
    """Switches the DSLR camera off."""
    turn_camera_off_message = turn_camera_off()
    camera_status_message, camera_status_status = camera_status()

    return jsonify(
        camera_status_status = camera_status_status,
        turn_camera_off_message = turn_camera_off_message,
        camera_status_message = camera_status_message
    )


@camera_endpoints.route("/api/camera/cameraOn", methods = ["GET"])
@requires_auth
def camera_on_endpoint():
    """Switches the DSLR camera on."""
    turn_camera_on_message = turn_camera_on()
    camera_status_message, camera_status_status = camera_status()

    return jsonify(
        camera_status_status = camera_status_status,
        turn_camera_on_message = turn_camera_on_message,
        camera_status_message = camera_status_message
    )


@camera_endpoints.route("/api/camera/cameraStatus", methods = ["GET"])
@requires_auth
def camera_status_endpoint():
    """Delivers a summary of the DSLR's status."""
    camera_status_message, camera_status_status = camera_status()

    return jsonify(
        camera_status_status = camera_status_status,
        camera_status_message = camera_status_message
    )


@camera_endpoints.route("/api/camera/downloadPicture", methods = ["POST"])
@requires_auth
def download_picture_endpoint():
    """Fetches the specified .NEF file for the user to download."""
    incoming = request.get_json()

    return jsonify(download_picture_status = download_picture(incoming.file))


@camera_endpoints.route("/api/camera/downloadThumbnail", methods = ["POST"])
@requires_auth
def download_thumbnail_endpoint():
    """Fetches the specified .jpg file for the user to download."""
    incoming = request.get_json()

    return jsonify(download_thumbnail_status = download_thumbnail(incoming.file))


@camera_endpoints.route("/api/camera/findPictures", methods = ["POST"])
@requires_auth
def find_pictures_endpoint():
    """Fetches the file names of pictures taken on the date specified."""
    incoming = request.get_json()

    return jsonify(picture_paths = find_pictures(incoming.date))


@camera_endpoints.route("/api/camera/removeThumbnail", methods = ["POST"])
@requires_auth
def remove_thumbnail_endpoint():
    """Deletes the specified thumbnail from the camera's filesystem."""
    incoming = request.get_json()

    return jsonify(remove_thumbnail_status = remove_thumbnail(incoming.path))


@camera_endpoints.route("/api/camera/turnVideoCameraOff", methods = ["GET"])
@requires_auth
def turn_video_camera_off_endpoint():
    """
    Switches the video camera off.

    Note: Doesn't return a boolean yet, because a way to detect the video camera's presence is still to be implemented.
    """
    return jsonify(turn_video_camera_off_status = turn_video_camera_off())


@camera_endpoints.route("/api/camera/turnVideoCameraOn", methods = ["GET"])
@requires_auth
def turn_video_camera_on_endpoint():
    """
    Switches the video camera on.

    Note: Doesn't return a boolean yet, because a way to detect the video camera's presence is still to be implemented.
    """
    return jsonify(turn_video_camera_on_status = turn_video_camera_on())
