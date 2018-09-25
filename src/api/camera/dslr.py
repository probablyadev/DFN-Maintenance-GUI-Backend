"""The camera dslr api module /camera/dslr endpoints."""

from flask import jsonify, current_app

from src.wrappers import old_endpoint, jwt
from src.console import console


__all__ = ['get', 'on', 'off']


def _status():
	output = console('lsusb')
	status = False

	if 'Nikon Corp.' in output:
		status = True

	return jsonify(status = status), 200


@jwt
@old_endpoint()
def get():
	return _status()


@jwt
@old_endpoint()
def on():
	if current_app.config['USE_DEV_COMMAND']:
		return jsonify(status = True), 200

	console('python /opt/dfn-software/enable_camera.py')

	return _status()


@jwt
@old_endpoint()
def off():
	if current_app.config['USE_DEV_COMMAND']:
		return jsonify(status = False), 200

	console('python /opt/dfn-software/disable_camera.py')

	return _status()
