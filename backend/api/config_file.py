import os
from flask import Blueprint, jsonify, request

from backend import constants
from backend.auth import requires_auth
from command.config_file import cf_check, config_whitelist, update_config_file

config_file_endpoints = Blueprint("config_file_api", __name__)


@config_file_endpoints.route("/api/configFile/checkConfigFile", methods = ["GET"])
@requires_auth
def check_config_file_endpoint():
    """Performs a configuration file check."""
    return jsonify(images = cf_check())


@config_file_endpoints.route("/api/configFile/configWhitelist", methods = ["GET"])
@requires_auth
def config_whitelist_endpoint():
    """Serves modifiable information to fill in the interface for changing the dfnstation.cfg file."""
    return jsonify(config_whitelist = config_whitelist())


@config_file_endpoints.route("/api/configFile/configFile", methods = ["GET"])
@requires_auth
def config_file_endpoint():
    """Serves the dfnstation.cfg file to the user to read."""
    path = constants.dfnconfigPath

    if os.path.exists(path):
        config_file = open(path, 'rb').read()

        return jsonify(config_file = config_file)


@config_file_endpoints.route("/api/configFile/updateConfigFile", methods = ["POST"])
@requires_auth
def update_config_file_endpoint():
    """Updates the dfnstation.cfg file with a new value for a parameter."""
    incoming = request.get_json()

    property = incoming.get('property').get('data')

    category = property.get('category')
    field = property.get('field')
    value = property.get('value')

    return jsonify(message = update_config_file(category, field, value))
