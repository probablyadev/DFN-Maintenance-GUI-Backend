import logging

from flask import current_app
from functools import wraps
from inspect import getmodule
from pprint import pformat
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

	logging.getLogger().debug('{} ({})'.format(network_path, file_path))

	handler = Handler(network_path)
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
				exception = {
					'cmd': error.cmd,
					'output': error.output,
					'returncode': error.returncode
				}

				handler.log.exception('\n{}'.format(pformat(exception)))
				handler.add_to_error_response(exception)
				handler.set_status(500)
			except Exception as error:
				handler.log.exception(error)
				handler.add_to_error_response(str(error))
				handler.set_status(500)

			return handler.to_json()
		return decorator

	if callable(prefix):
		return endpoint_decorator(prefix)
	else:
		return endpoint_decorator
