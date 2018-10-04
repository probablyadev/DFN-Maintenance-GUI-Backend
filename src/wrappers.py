import logging

from flask import current_app
from flask_jwt_extended import jwt_optional, get_jwt_identity
from functools import wraps
from subprocess import CalledProcessError
from inspect import getargspec, getmodule
from pprint import pformat
from time import time

from src.handler import Handler


__all__ = ['endpoint', 'injector', 'logger', 'jwt']


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


def jwt(function):
	@jwt_optional
	@wraps(function)
	def decorator(*args, **kwargs):
		if current_app.config['NO_AUTH']:
			return function(*args, **kwargs)
		elif get_jwt_identity() is None:
			return 403
		else:
			return function(*args, **kwargs)

	return decorator


def endpoint(prefix = None):
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


# TODO: Properly format time.
def stats(function):
	@wraps(function)
	def decorator(*args, **kwargs):
		if current_app.config['NO_STATS'] is False:
			start = time()
			function(*args, **kwargs)
			end = time()

			stats = {
				'time': {
					'start': start,
					'end': end,
					'time': end - start
				}
			}

			current_app.handler.add_to_common_response(stats = stats)
		else:
			function(*args, **kwargs)

	return decorator


def logger(*decorator_args, **decorator_kwargs):
	'''
	@logger('Gathering debug output...', level = 'DEBUG')
	or
	@logger('Gathering debug output...')
	or
	@logger()

	If using @logger(), in the method doc string, write (remove the -):

	"""
	- :log message: Gathering debug output...
	- :log level: DEBUG
	"""

	Must be placed above the @injector decorator.
	'''
	def logger_decorator(function):
		@wraps(function)
		def decorator(*args, **kwargs):
			message_prefix = '\t:log message: '
			level_prefix = '\t:log level: '

			level = decorator_kwargs.pop('level', 'INFO')

			if decorator_args:
				message = decorator_args[0]
			else:
				message = ''

				for line in function.__doc__.splitlines():
					if message_prefix in line:
						message = line.replace(message_prefix, '')

					if level_prefix in line:
						level = line.replace(level_prefix, '')
						level = level.replace(' ', '')

			level = getattr(logging, level)
			current_app.handler.log.log(level, message)

			return function(*args, **kwargs)
		return decorator
	return logger_decorator


def injector(function):
	'''
	Injects objects from current_app into the decorated method. Must have the injected objects as params in the
	decorated method after the methods normal parameters.

	Can also inject an array of key / value pairs from config. E.g.

	@injector(config = ['VERBOSE'])
	def method(config):
	'''
	@wraps(function)
	def decorator(*args, **kwargs):
		argsspec = getargspec(function)

		if 'handler' in argsspec.args:
			kwargs['handler'] = current_app.handler

		if 'log' in argsspec.args:
			kwargs['log'] = current_app.handler.log

		# TODO: Add error handling for config retrieval.
		if 'config' in argsspec.args:
			class Config():
				pass

			config = Config()

			for entry in current_app.config:
				setattr(config, entry.lower(), current_app.config[entry])

			kwargs['config'] = config

		return function(*args, **kwargs)
	return decorator


# TODO: Decorator called 'conditionallly', requires a condition to be true in order to execute e.g. @conditionally(config.verbose, True).
# https://stackoverflow.com/questions/3773555/python3-decorating-conditionally#answer-3865534
