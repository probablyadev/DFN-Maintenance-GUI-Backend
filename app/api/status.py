import os
import datetime
from flask import Blueprint, jsonify
from app.utils.auth import requires_auth
from command.status import *


status_endpoints = Blueprint("status_api", __name__)


@status_endpoints.route("/api/status/latest_log", methods = ["GET"])
@requires_auth
def latest_log_endpoint():
    """Serves the latest logfile from interval control."""
    path = "/data0/latest/" + get_log("latest")

    if os.path.exists(path):
        logfile = open(path, 'rb').read()

        file_state = os.stat(path)
        timestamp = datetime.datetime.fromtimestamp(file_state.st_mtime).strftime('%d-%m-%Y %H:%M:%S')

        return jsonify(
            logfile = logfile,
            timestamp = timestamp
        )
    else:
        raise AttributeError("Unable to locate the latest log file: " + path)


@status_endpoints.route("/api/status/second_latest_log", methods = ["GET"])
@requires_auth
def second_latest_log_endpoint():
    """Serves the second-latest logfile from interval control."""
    path = "/data0/latest_prev/" + get_log("latest_prev")

    if os.path.exists(path):
        logfile = open(path, 'rb').read()

        file_state = os.stat(path)
        timestamp = datetime.datetime.fromtimestamp(file_state.st_mtime).strftime('%d-%m-%Y %H:%M:%S')

        return jsonify(
            logfile = logfile,
            timestamp = timestamp
        )
    else:
        raise AttributeError("Unable to locate the second latest log file: " + path)
