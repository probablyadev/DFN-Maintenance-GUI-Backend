from flask import Blueprint, jsonify

from backend.auth import requires_auth
from command.interval_control_test import interval_test, prev_interval_test

interval_control_test_endpoints = Blueprint("interval_control_test_api", __name__)


@interval_control_test_endpoints.route("/api/interval_control_test/interval_test", methods = ["GET"])
@requires_auth
def interval_test_endpoint():
    """Performs an interval control test on the system."""
    interval_test_message, interval_test_status = interval_test()

    return jsonify(
        interval_test_message = interval_test_message,
        interval_test_status = interval_test_status
    )


@interval_control_test_endpoints.route("/api/interval_control_test/prev_interval_test", methods = ["GET"])
@requires_auth
def prev_interval_test_endpoint():
    """Checks the /latest folder to see if the camera took pictures the last time the interval control ran."""
    return jsonify(prev_interval_test_message = prev_interval_test())
