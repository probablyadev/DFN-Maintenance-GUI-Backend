"""The camera dslr api module /camera/dslr endpoints."""

from flask_jwt import jwt_required
from flask import jsonify

from src.wrappers import wrap_error
from src.console import console


__all__ = ['get', 'on', 'off']


def _status():
	output = console('lsusb', 'echo Nikon Corp.')
	status = False

	if 'Nikon Corp.' in output:
		status = True

	return jsonify(status = status), 200


@jwt_required()
@wrap_error
def get():
	return _status()


@jwt_required()
@wrap_error
def on():
	console('python /opt/dfn-software/enable_camera.py')

	return _status()


@jwt_required()
@wrap_error
def off():
	console('python /opt/dfn-software/disable_camera.py')

	return _status()
