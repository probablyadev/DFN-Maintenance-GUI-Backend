from flask import Blueprint, jsonify

from backend.auth import requires_auth
from command.status import *

status_endpoints = Blueprint("status_api", __name__)


@status_endpoints.route("/api/status/latestLog", methods = ["GET"])
@requires_auth
def latest_log_endpoint():
    """Serves the latest logfile from interval control."""
    logfile, timestamp = latest_log()

    return jsonify(
        logfile = logfile,
        timestamp = timestamp
    )


@status_endpoints.route("/api/status/secondLatestLog", methods = ["GET"])
@requires_auth
def second_latest_log_endpoint():
    """Serves the second-latest logfile from interval control."""
    logfile, timestamp = second_latest_log()

    return jsonify(
        logfile = logfile,
        timestamp = timestamp
    )
