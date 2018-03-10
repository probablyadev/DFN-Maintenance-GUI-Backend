from flask import Blueprint, jsonify, request

from backend.auth import requires_auth
from command.hdd import *

hdd_endpoints = Blueprint("hdd_api", __name__)


@hdd_endpoints.route("/api/hdd/check_hdd", methods = ["GET"])
@requires_auth
def check_hdd_endpoint():
    """Delivers a summary of the external hard drive's status."""
    check_hdd_message, check_hdd_status = check_hdd()

    return jsonify(
        check_hdd_status = check_hdd_status,
        check_hdd_message = check_hdd_message
    )


@hdd_endpoints.route("/api/hdd/enable_hdd", methods = ["GET"])
@requires_auth
def enable_hdd_endpoint():
    """Switches the camera's external hard drives on."""
    enable_hdd_message = enable_hdd()
    check_hdd_message, check_hdd_status = check_hdd()

    return jsonify(
        check_hdd_status = check_hdd_status,
        enable_hdd_message = enable_hdd_message,
        check_hdd_message = check_hdd_message,
    )


@hdd_endpoints.route("/api/hdd/format_hdd", methods = ["POST"])
@requires_auth
def format_hdd_endpoint():
    """Formats the specified drives."""
    incoming = request.get_json()

    return jsonify(format_hdd_message = format_hdd(incoming.args))


@hdd_endpoints.route("/api/hdd/mount_hdd", methods = ["GET"])
@requires_auth
def mount_hdd_endpoint():
    """Mounts the powered HDD's to the filesystem."""
    mount_hdd_message = mount_hdd()
    check_hdd_message, check_hdd_status = check_hdd()

    return jsonify(
        check_hdd_status = check_hdd_status,
        mount_hdd_message = mount_hdd_message,
        check_hdd_message = check_hdd_message
    )


@hdd_endpoints.route("/api/hdd/move_data_0_hdd", methods = ["GET"])
@requires_auth
def move_data_0_endpoint():
    """Moves /data0 data to the external drives."""
    return jsonify(move_data_0_message = move_data_0())


@hdd_endpoints.route("/api/hdd/probe_hdd", methods = ["GET"])
@requires_auth
def probe_hdd_endpoint():
    """Searches for present drives to format."""
    return jsonify(drives = probe_hdd())


@hdd_endpoints.route("/api/hdd/smart_test", methods = ["GET"])
@requires_auth
def smart_test_endpoint():
    """Performs a smart test."""
    return jsonify(smart_test_message = smart_test())


@hdd_endpoints.route("/api/hdd/unmount_hdd", methods = ["GET"])
@requires_auth
def unmount_hdd_endpoint():
    """Unmount's the powered HDD's to the filesystem."""
    unmount_hdd_message = unmount_hdd()
    check_hdd_message, check_hdd_status = check_hdd()

    return jsonify(
        check_hdd_status = check_hdd_status,
        unmount_hdd_message = unmount_hdd_message,
        check_hdd_message = check_hdd_message
    )
