from flask import Blueprint, jsonify, request
from app.utils.auth import requires_auth
from command.hdd import *

hdd_endpoints = Blueprint("hdd_api", __name__)

@hdd_endpoints.route("/api/hdd/check_hdd", methods = ["GET"])
@requires_auth
def check_hdd_endpoint():
    """Delivers a summary of the external hard drive's status."""
    message, hdd_array_status = check_hdd()

    return jsonify(
        message = message,
        hdd_array_status = hdd_array_status
    )


@hdd_endpoints.route("/api/hdd/enable_hdd", methods = ["GET"])
@requires_auth
def enable_hdd_endpoint():
    """Switches the camera's external hard drives on."""
    status_message, hdd_array_status = check_hdd()

    return jsonify(
        enable_message = enable_hdd(),
        status_message = status_message,
        hdd_array_status = hdd_array_status
    )


@hdd_endpoints.route("/api/hdd/format_hdd", methods = ["POST"])
@requires_auth
def format_hdd_endpoint():
    """Formats the specified drives."""
    incoming = request.get_json()

    return jsonify(message = format_hdd(incoming.args))


@hdd_endpoints.route("/api/hdd/mount_hdd", methods = ["GET"])
@requires_auth
def mount_hdd_endpoint():
    """Mounts the powered HDD's to the filesystem."""
    status_message, hdd_array_status = check_hdd()

    return jsonify(
        mount_message = mount_hdd(),
        status_message = status_message,
        hdd_array_status = hdd_array_status
    )


@hdd_endpoints.route("/api/hdd/move_data_0_hdd", methods = ["GET"])
@requires_auth
def move_data_0_endpoint():
    """Moves /data0 data to the external drives."""
    return jsonify(message = move_data_0())


@hdd_endpoints.route("/api/hdd/probe_hdd", methods = ["GET"])
@requires_auth
def probe_hdd_endpoint():
    """Searches for present drives to format."""
    return jsonify(drives = probe_hdd())


@hdd_endpoints.route("/api/hdd/smart_test", methods = ["GET"])
@requires_auth
def smart_test_endpoint():
    """Performs a smart test."""
    return jsonify(message = smart_test())


@hdd_endpoints.route("/api/hdd/unmount_hdd", methods = ["GET"])
@requires_auth
def unmount_hdd_endpoint():
    """Unmount's the powered HDD's to the filesystem."""
    status_message, hdd_array_status = check_hdd()

    return jsonify(
        unmount_message = unmount_hdd(),
        status_message = status_message,
        hdd_array_status = hdd_array_status
    )
