from flask import Blueprint, jsonify, request

from backend.auth import requires_auth
from command.time import *

time_endpoints = Blueprint("time_api", __name__)


@time_endpoints.route("/api/time/outputTime", methods = ["GET"])
@requires_auth
def output_time_endpoint():
    """Outputs the current system time to the user."""
    return jsonify(time = system_time())


@time_endpoints.route("/api/time/getTimezone", methods = ["GET"])
@requires_auth
def get_timezone_endpoint():
    """Returns the systems timezone."""
    return jsonify(timezone = get_timezone())


@time_endpoints.route("/api/time/changeTimezone", methods = ["POST"])
@requires_auth
def change_timezone_endpoint():
    """Changes the system's timezone."""
    incoming = request.get_json()

    change_timezone(incoming.get('timezone'))

    return ('', 204)
