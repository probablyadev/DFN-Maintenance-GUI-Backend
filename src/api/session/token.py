"""The session token api module /session/token endpoints."""

from flask import jsonify, current_app
from flask_jwt_extended import (
	create_access_token, create_refresh_token,
	jwt_refresh_token_required, get_jwt_identity,
	jwt_required
)

from src.database import User


__all__ = ['auth', 'refresh']


def auth(json):
	username = json.get('username', None)
	password = json.get('password', None)

	user = User.query.filter_by(username = username).one()

	if user.check_password(password):
		return jsonify(
			access_token = create_access_token(identity = username),
			expires_in = current_app.config['JWT_ACCESS_TOKEN_EXPIRES'].total_seconds(),
			refresh_token = create_refresh_token(identity = username)
		), 200
	else:
		return jsonify(output = 'Bad username or password'), 401


@jwt_required
def check():
	return 200


@jwt_refresh_token_required
def refresh():
	return jsonify(
		access_token = create_access_token(identity = get_jwt_identity()),
		expires_in = current_app.config['JWT_ACCESS_TOKEN_EXPIRES'].total_seconds()
	), 200


# reject
