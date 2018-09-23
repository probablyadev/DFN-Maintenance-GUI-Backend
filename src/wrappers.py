from flask import jsonify, current_app
from functools import wraps
from subprocess import CalledProcessError
from inspect import getargspec, getmodule
from pprint import pformat

from src.handler import Handler


__all__ = ['old_endpoint', 'endpoint']


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


def endpoint():
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

				handler.add_error_to_response(exception)
				handler.log.exception('\n{}'.format(pformat(exception)))
			except Exception as error:
				handler.log.exception(error)
				handler.add_error_to_response(str(error))

			return handler.to_json()
		return decorator
	return endpoint_decorator
