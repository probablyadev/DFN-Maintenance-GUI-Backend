from flask import jsonify
from functools import wraps
from subprocess import CalledProcessError


__all__ = ['wrap_error']


def _exception_json(error):
	cmd = ''
	returncode = 1
	output = 'Error'

	if error is CalledProcessError:
		cmd = error.cmd
		returncode = error.returncode
		output = error.output
	else:
		output = str(error)

	return jsonify(cmd = cmd, returncode = returncode, output = output)


def wrap_error(function):
	@wraps(function)
	def decorator(*args, **kwds):
		try:
			return function(*args, **kwds)
		except Exception as error:
			return _exception_json(error), 500

	return decorator
