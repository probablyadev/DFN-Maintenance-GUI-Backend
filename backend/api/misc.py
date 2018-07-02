from flask import Blueprint, jsonify

from command.misc import get_hostname

misc_endpoints = Blueprint("misc_api", __name__)


@misc_endpoints.route("/api/misc/getHostname", methods = ["GET"])
def get_hostname_endpoint():
    """Gets the hostname of the current DFN camera."""
    return jsonify(hostname = get_hostname())
