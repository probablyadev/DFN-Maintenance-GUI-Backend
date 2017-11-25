import json

from command.network import internetStatus
from endpoint.page_request.login_checker import LoginChecker


class InternetCheck:
	def GET(self):
		"""
		Delivers a summary of the internet connectivity of the system.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				internetStatus (bool): Internet connectivity of the system.
		"""
		if LoginChecker.loggedIn():
			data = {}
			data['consoleFeedback'], data['internetStatus'] = internetStatus()
			outJSON = json.dumps(data)

			return outJSON