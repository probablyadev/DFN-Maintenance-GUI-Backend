from logging import getLogger

from flask import current_app
from functools import wraps
from inspect import getmodule
from subprocess import CalledProcessError

from src.handler import Handler


def _handler_setup(function, prefix):
	if callable(prefix):
		prefix = None

	module = getmodule(function).__name__
	file_path = '{}.{}'.format(module, function.__name__)
	module = module.replace('src.', '').replace('.', '/')

	if function.__name__ in ['get', 'post', 'put', 'patch', 'delete']:
		if prefix is None:
			network_path = module
		else:
			network_path = '{}/{}'.format(module, prefix)
	else:
		network_path = '{}/{}'.format(module, function.__name__)

	getLogger().debug('{} ({})'.format(network_path, file_path))

	handler = Handler(file_path)
	current_app.handler = handler

	return handler


def handler(prefix = None):
	def endpoint_decorator(function):
		@wraps(function)
		def decorator(*args, **kwargs):
			handler = _handler_setup(function, prefix)

			try:
				function(*args, **kwargs)
			except CalledProcessError as error:
				handler.status(500)
				handler.add({ 'error': {
					'cmd': error.cmd,
					'msg': error.output,
					'returncode': error.returncode }})
			except Exception as error:
				handler.log.exception(error)
				handler.add({ 'error': { 'msg': str(error) }})
				handler.status(500)

			return handler.to_json()
		return decorator

	if callable(prefix):
		return endpoint_decorator(prefix)
	else:
		return endpoint_decorator
