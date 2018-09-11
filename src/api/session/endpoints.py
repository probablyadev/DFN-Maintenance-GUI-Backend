"""The session api module /session endpoints."""

import logging
from flask_jwt import jwt_required, current_identity
from flask import jsonify

from src.console import console
from src.wrappers import wrap_error


@jwt_required()
def check_token():
	logging.info('Valid token request for identity: {}'.format(current_identity))

@wrap_error()
def hostname():
	return jsonify(hostname = console("hostname")), 200
