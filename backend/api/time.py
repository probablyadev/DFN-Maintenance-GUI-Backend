from flask import Blueprint, jsonify, request

from backend.auth import requires_auth
from command.time import *

time_endpoints = Blueprint("time_api", __name__)


@time_endpoints.route("/api/time/output_time", methods = ["GET"])
@requires_auth
def output_time_endpoint():
    """Outputs the current system time to the user."""
    return jsonify(system_time = system_time())


@time_endpoints.route("/api/time/change_timezone", methods = ["POST"])
@requires_auth
def change_timezone_endpoint():
    """Changes the system's timezone."""
    incoming = request.get_json()

    return jsonify(timezone = change_timezone(incoming.timezone))
