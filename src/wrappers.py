from flask import jsonify, current_app
from functools import wraps
from subprocess import CalledProcessError
from inspect import getargspec, getmodule
from pprint import pformat
import logging

from src.handler import Handler


__all__ = ['old_endpoint', 'endpoint', 'current_app_injecter', 'log_doc']


def old_endpoint():
	def endpoint_decorator(function):
		@wraps(function)
		def decorator(*args, **kwargs):
			handler = Handler(__name__)
			current_app.handler = handler

			handler.log.info('')

			try:
				argsspec = getargspec(function)

				if 'handler' in argsspec.args:
					return function(*args, **dict(kwargs, handler = handler))
				else:
					return function(*args, **kwargs)
			except Exception as error:
				handler.log.exception(error)

				cmd = ''
				returncode = 1

				if error is CalledProcessError:
					cmd = error.cmd
					returncode = error.returncode
					output = error.output
				else:
					output = str(error)

				return jsonify(cmd = cmd, returncode = returncode, output = output), 500
		return decorator
	return endpoint_decorator


# TODO: Accept array of expected exception types (much like wrap_error in argh).
# TODO: Accept 2 messages, one to say at the start ('storage.power on endpoint' - default is ''), and end ('sending response' - default).
def endpoint(arg = None):
	def endpoint_decorator(function):
		@wraps(function)
		def decorator(*args, **kwargs):
			handler = Handler('{}.{}'.format(getmodule(function).__name__, function.__name__))
			current_app.handler = handler

			handler.log.info('')

			try:
				argsspec = getargspec(function)

				if 'handler' in argsspec.args:
					function(*args, **dict(kwargs, handler = handler))
				else:
					function(*args, **kwargs)
			except CalledProcessError as error:
				exception = {
					'cmd': error.cmd,
					'output': error.output,
					'returncode': error.returncode
				}

				handler.log.exception('\n{}'.format(pformat(exception)))
				handler.add_error_to_response(exception)
				handler.set_status(500)
			except Exception as error:
				handler.log.exception(error)
				handler.add_error_to_response(str(error))
				handler.set_status(500)

			return handler.to_json()
		return decorator

	if callable(arg):
		return endpoint_decorator(arg)
	else:
		return endpoint_decorator


def current_app_injecter(*args, **kwargs):
	def current_app_injecter_decorator(function):
		@wraps(function)
		def decorator(*_args, **_kwargs):
			argsspec = getargspec(function)

			if 'handler' in argsspec.args:
				_kwargs['handler'] = current_app.handler

			if 'log' in argsspec.args:
				_kwargs['log'] = current_app.handler.log

			# TODO: Add error handling for config retrieval.
			if 'config' in argsspec.args:
				if kwargs['config']:
					class Config():
						pass

					config = Config()

					for kwarg in kwargs['config']:
						setattr(config, kwarg.lower(), current_app.config[kwarg])

					_kwargs['config'] = config
				else:
					_kwargs['config'] = current_app.config

			return function(*_args, **_kwargs)
		return decorator

	if callable(args):
		return current_app_injecter_decorator(args)
	else:
		return current_app_injecter_decorator


def log_doc(*args, **kwargs):
	'''
	@log_doc('Gathering debug output...', level = 'DEBUG')
	or
	@log_doc('Gathering debug output...')
	or
	@log_doc()

	If using @log_doc(), in the method doc string, write:

	"""
	:log message: Gathering debug output...
	:log level: DEBUG
	"""

	Must be placed above the @current_app_injector decorator.
	'''
	def log_doc_decorator(function):
		@wraps(function)
		def decorator(*_args, **_kwargs):
			message_prefix = '\t:log message: '
			level_prefix = '\t:log level: '

			level = kwargs.pop('level', 'INFO')

			if args:
				message = args[0]
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

			return function(*_args, **_kwargs)
		return decorator

	if callable(args):
		return log_doc_decorator(args)
	else:
		return log_doc_decorator


# TODO: Decorator called 'conditionallly', requires a condition to be true in order to execute e.g. @conditionally(config.verbose, True).
# https://stackoverflow.com/questions/3773555/python3-decorating-conditionally#answer-3865534
