import json
from command.status import updateConfigFile
from endpoint.page_request.login_checker import LoginChecker


class UpdateConfigFile:
	def GET(self):
		"""
		Updates the dfnstation.cfg file with a new value for a parameter.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			try:
				data = {}
				data['consoleFeedback'] = updateConfigFile(web.input())
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON