from flask import current_app
from functools import wraps
from time import time


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
