from flask import Blueprint, jsonify, request
from app.utils.auth import requires_auth
from command.camera import *

camera_endpoints = Blueprint("camera_api", __name__)

@camera_endpoints.route("/api/camera/camera_off", methods = ["GET"])
@requires_auth
def camera_off_endpoint():
    """Switches the DSLR camera off."""
    message = turn_camera_off()
    cam_message, status = camera_status()
    message += cam_message

    return jsonify(
        status = status,
        message = message
    )


@camera_endpoints.route("/api/camera/camera_on", methods = ["GET"])
@requires_auth
def camera_off_endpoint():
    """Switches the DSLR camera on."""
    message = turn_camera_on()
    cam_message, status = camera_status()
    message += cam_message

    return jsonify(
        status = status,
        message = message
    )


@camera_endpoints.route("/api/camera/camera_status", methods = ["GET"])
@requires_auth
def camera_status_endpoint():
    """Delivers a summary of the DSLR's status."""
    message, status = camera_status()

    return jsonify(
        status = status,
        message = message
    )


@camera_endpoints.route("/api/camera/download_picture", methods = ["POST"])
@requires_auth
def download_picture_endpoint():
    """Fetches the specified .NEF file for the user to download."""
    incoming = request.get_json()

    return jsonify(status = download_picture(incoming.file))


@camera_endpoints.route("/api/camera/download_thumbnail", methods = ["POST"])
@requires_auth
def download_thumbnail_endpoint():
    """Fetches the specified .jpg file for the user to download."""
    incoming = request.get_json()

    return jsonify(status = download_thumbnail(incoming.file))


@camera_endpoints.route("/api/camera/find_pictures", methods = ["POST"])
@requires_auth
def find_pictures_endpoint():
    """Fetches the file names of pictures taken on the date specified."""
    incoming = request.get_json()

    return jsonify(picture_paths = find_pictures(incoming.date))


@camera_endpoints.route("/api/camera/remove_thumbnail", methods = ["POST"])
@requires_auth
def remove_thumbnail_endpoint():
    """Deletes the specified thumbnail from the camera's filesystem."""
    incoming = request.get_json()

    return jsonify(status = remove_thumbnail(incoming.path))


@camera_endpoints.route("/api/camera/turn_video_camera_off", methods = ["GET"])
@requires_auth
def turn_video_camera_off_endpoint():
    """
    Switches the video camera off.

    Note: Doesn't return a boolean yet, because a way to detect the video camera's presence is still to be implemented.
    """
    return jsonify(status = turn_video_camera_off())


@camera_endpoints.route("/api/camera/turn_video_camera_on", methods = ["GET"])
@requires_auth
def turn_video_camera_on_endpoint():
    """
    Switches the video camera on.

    Note: Doesn't return a boolean yet, because a way to detect the video camera's presence is still to be implemented.
    """
    return jsonify(status = turn_video_camera_on())
