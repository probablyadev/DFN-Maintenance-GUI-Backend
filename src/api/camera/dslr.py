import src.wrappers as wrappers
from src.console import console


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.injector
def get(handler):
	handler.add({ 'status': _status() })


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.logger('Enabling DSLR camera.')
@wrappers.injector
def on(handler):
	console('python /opt/dfn-software/enable_camera.py')
	handler.add({ 'status': _status() })


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.logger('Disabling DSLR camera.')
@wrappers.injector
def off(handler):
	console('python /opt/dfn-software/disable_camera.py')
	handler.add({ 'status': _status() })


@wrappers.logger('Checking status of DSLR camera.')
@wrappers.injector
def _status(log):
	status = False

	if 'Nikon Corp.' in console('lsusb'):
		status = True

	log.debug('DSLR Camera Status: {}'.format(status))

	return status
