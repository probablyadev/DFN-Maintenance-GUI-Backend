from flask import current_app
from functools import wraps
from datetime import datetime


def _time(start, end):
	delta = (end - start).total_seconds()

	return {
		'start': start.strftime('%H:%M:%S'),
		'end': end.strftime('%H:%M:%S'),
		'time': '{} seconds'.format(format(delta, '.2f'))
	}


def stats(function):
	@wraps(function)
	def decorator(*args, **kwargs):
		if current_app.config['NO_STATS'] is False:
			start = datetime.now()

			function(*args, **kwargs)

			end = datetime.now()

			stats = {
				'time': _time(start, end)
			}

			current_app.handler.add_to_common_response(stats = stats)
		else:
			function(*args, **kwargs)

	return decorator
