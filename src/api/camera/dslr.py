from src.wrappers import jwt, endpoint, injector, logger
from src.console import console


__all__ = ['get', 'on', 'off']


@logger('Checking status of DSLR camera.')
@injector
def _status(log):
	status = False

	if 'Nikon Corp.' in console('lsusb'):
		status = True

	log.debug('DSLR Camera Status: {}'.format(status))

	return status


@jwt
@endpoint
@injector
def get(handler):
	handler.add_to_success_response(status = _status())


@jwt
@logger('Enabling DSLR camera.')
@endpoint
@injector
def on(handler):
	console('python /opt/dfn-software/enable_camera.py')
	handler.add_to_success_response(status = _status())


@jwt
@logger('Disabling DSLR camera.')
@endpoint
@injector
def off(handler):
	console('python /opt/dfn-software/disable_camera.py')
	handler.add_to_success_response(status = _status())
