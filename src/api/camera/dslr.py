"""The camera dslr api module /camera/dslr endpoints."""

from src.wrappers import jwt, endpoint, current_app_injecter, log_doc
from src.console import console


__all__ = ['get', 'on', 'off']


@log_doc('Checking status of DSLR camera')
@current_app_injecter()
def _status(log):
	status = False

	if 'Nikon Corp.' in console('lsusb'):
		status = True

	log.debug('DSLR Camera Status: {}'.format(status))

	return status


@jwt
@endpoint()
@current_app_injecter()
def get(handler):
	handler.add_to_response(status = _status())


@jwt
@log_doc('Enabling DSLR camera.')
@endpoint()
@current_app_injecter(config = ['USE_DEV_COMMAND'])
def on(handler, config):
	if config.use_dev_command:
		handler.add_to_response(status = True)
	else:
		console('python /opt/dfn-software/enable_camera.py')
		handler.add_to_response(status = _status())


@jwt
@endpoint()
@current_app_injecter(config = ['USE_DEV_COMMAND'])
def off(handler):
	if config.use_dev_command:
		handler.add_to_response(status = False)
	else:
		console('python /opt/dfn-software/disable_camera.py')
		handler.add_to_response(status = _status())
