from flask import current_app
from flask_jwt_extended import jwt_optional, get_jwt_identity
from functools import wraps


def jwt(function):
	@jwt_optional
	@wraps(function)
	def decorator(*args, **kwargs):
		if current_app.config['NO_AUTH']:
			return function(*args, **kwargs)
		elif get_jwt_identity() is None:
			return 403
		else:
			return function(*args, **kwargs)

	return decorator
