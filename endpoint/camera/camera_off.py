import json

import commandSender
from endpoint.page_request.login_checker import LoginChecker

class CameraOff:
	def GET(self):
		"""
		Switches the DSLR camera off.

		Returns:
			outJSON (json): A JSON object containing the consoleFeedback and cameraStatus with the format::

				consoleFeedback (str): Resulting feedback.
				cameraStats (bool): Represents whether the DSLR camera is turned on or off.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['consoleFeedback'] = commandSender.cameraOff()
				statusFeedback, statusBoolean = commandSender.cameraStatus()
				data['consoleFeedback'] += statusFeedback
				data['cameraStatus'] = statusBoolean
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON