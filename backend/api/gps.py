from flask import Blueprint, jsonify

from backend.auth import requires_auth
from command.gps import gps_check

gps_endpoints = Blueprint("gps_api", __name__)


@gps_endpoints.route("/api/gps/check_gps", methods = ["GET"])
@requires_auth
def check_gps_endpoint():
    """Delivers a summary of the GPS status."""
    gps_check_message, gps_check_status = gps_check()

    return jsonify(
        gps_check_status = gps_check_status,
        gps_check_message = gps_check_message
    )
