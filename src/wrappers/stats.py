from flask import current_app
from functools import wraps
from datetime import datetime


def stats(function):
	@wraps(function)
	def decorator(*args, **kwargs):
		if current_app.config['NO_STATS'] is False:
			start = datetime.now()
			function(*args, **kwargs)
			end = datetime.now()

			current_app.handler.add({
				'stats': {
					'time': {
						'start': start.strftime('%H:%M:%S'),
						'end': end.strftime('%H:%M:%S'),
						'time': '{} seconds'.format(format((end - start).total_seconds(), '.2f'))
					}
				}
			})
		else:
			function(*args, **kwargs)

	return decorator
