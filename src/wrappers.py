from flask import jsonify
from functools import wraps
from subprocess import CalledProcessError
from logging import getLogger


__all__ = ['wrap_error']
log = getLogger(__name__)


def _exception_json(error):
	cmd = ''
	returncode = 1

	if error is CalledProcessError:
		cmd = error.cmd
		returncode = error.returncode
		output = error.output
	else:
		output = str(error)

	return jsonify(cmd = cmd, returncode = returncode, output = output)


def wrap_error():
	def wrap_error_decorator(function):
		@wraps(function)
		def decorator(*args, **kwds):
			try:
				return function(*args, **kwds)
			except Exception as error:
				log.exception(error)

				return _exception_json(error), 500

		return decorator

	return wrap_error_decorator
