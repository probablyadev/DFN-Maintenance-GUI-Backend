from flask import Blueprint, jsonify
from app.utils.auth import requires_auth
from command.config_file import cf_check


config_file_endpoints = Blueprint("config_file_api", __name__)


@config_file_endpoints.route("/api/config_file/config_file_check", methods = ["GET"])
@requires_auth
def config_file_check_endpoint():
    """Performs a configuration file check."""
    return jsonify(images = cf_check())
