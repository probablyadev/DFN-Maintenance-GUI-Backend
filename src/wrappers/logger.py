from logging import getLevelName

from flask import current_app
from functools import wraps


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

			level = decorator_kwargs.get('level', 'INFO')

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

			current_app.handler.log.log(getLevelName(level), message)

			return function(*args, **kwargs)
		return decorator
	return logger_decorator
