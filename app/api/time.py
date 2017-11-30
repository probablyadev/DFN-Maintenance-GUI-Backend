from flask import Blueprint, jsonify, request
from app.utils.auth import requires_auth
from command.time import output_time, timezone_change

time_endpoints = Blueprint("time_api", __name__)

@time_endpoints.route("/api/time/output_time", methods = ["GET"])
@requires_auth
def output_time_endpoint():
    """Outputs the current system time to the user."""
    return jsonify(system_time = output_time())


@time_endpoints.route("/api/time/timezone_change", methods = ["POST"])
@requires_auth
def timezone_change_endpoint():
    """Outputs the current system time to the user."""
    incoming = request.get_json()

    return jsonify(timezone = timezone_change(incoming.timezone))
