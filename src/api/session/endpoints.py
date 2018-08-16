"""The session api module /session endpoints."""

import logging
from flask_jwt import jwt_required, current_identity
from flask import jsonify

from src.console import console, exception_json


@jwt_required()
def check_token():
	logging.info('Valid token request for identity: {}'.format(current_identity))

def hostname():
	try:
		return jsonify(hostname = console("hostname")), 200
	except CalledProcessError as error:
		return exception_json(error), 500
