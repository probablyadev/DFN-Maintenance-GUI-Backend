from flask import jsonify, current_app
from functools import wraps
from subprocess import CalledProcessError
from inspect import getargspec, getmodule
from pprint import pformat

from src.handler import Handler


__all__ = ['old_endpoint', 'endpoint', 'current_app_injecter']


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
				_kwargs = dict(handler = current_app.handler, **_kwargs)

			if 'log' in argsspec.args:
				_kwargs = dict(log = current_app.handler.log, **_kwargs)

			if 'config' in argsspec.args:
				if kwargs['config']:
					class Config():
						pass

					config = Config()

					for kwarg in kwargs['config']:
						setattr(config, kwarg.lower(), current_app.config[kwarg])

					_kwargs['config'] = config
				else:
					_kwargs = dict(config = current_app.config, **_kwargs)

			return function(*_args, **dict(_kwargs))

		return decorator

	if callable(args):
		return current_app_injecter_decorator(args)
	else:
		return current_app_injecter_decorator
