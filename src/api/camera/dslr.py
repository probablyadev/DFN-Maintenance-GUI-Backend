from src.console import console
from src.wrappers import endpoint, logger, injector


@endpoint
def get(handler):
	handler.add({ 'status': _status() })


@endpoint
@logger('Enabling DSLR camera.')
def on(handler):
	console('python /opt/dfn-software/enable_camera.py')
	handler.add({ 'status': _status() })


@endpoint
@logger('Disabling DSLR camera.')
def off(handler):
	console('python /opt/dfn-software/disable_camera.py')
	handler.add({ 'status': _status() })


@logger('Checking status of DSLR camera.')
@injector
def _status(log):
	status = False

	if 'Nikon Corp.' in console('lsusb'):
		status = True

	log.debug('DSLR Camera Status: {}'.format(status))

	return status
