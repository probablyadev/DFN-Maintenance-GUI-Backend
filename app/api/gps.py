from flask import Blueprint, jsonify
from app.utils.auth import requires_auth
from command.gps import gps_check

gps_endpoints = Blueprint("gps_api", __name__)

@gps_endpoints.route("/api/gps/gps_check", methods = ["GET"])
@requires_auth
def gps_check_endpoint():
    """Delivers a summary of the GPS status."""
    message, status = gps_check()

    return jsonify(
        status= status,
        message = message
    )
