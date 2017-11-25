import json

import commandSender
from endpoint.page_request.login_checker import LoginChecker


class TimezoneChange:
	def GET(self):
		"""
		Changes the system's timezone.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.

		web.input fetches the timezone information from the user.
		"""
		if LoginChecker.loggedIn():
			data = {}
			timezone = web.input().zone
			data['consoleFeedback'] = commandSender.timezoneChange(timezone)
			outJSON = json.dumps(data)

			return outJSON