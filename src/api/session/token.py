"""The session token api module /session/token endpoints."""

from flask_jwt import jwt_required


__all__ = ['get']


@jwt_required()
def get():
	return 200
