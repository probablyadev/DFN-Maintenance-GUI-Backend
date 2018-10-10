from flask import current_app
from functools import wraps
from inspect import getargspec


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
		print(argsspec)

		if 'endpoint' in argsspec.args:
			kwargs['endpoint'] = current_app.handler

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
