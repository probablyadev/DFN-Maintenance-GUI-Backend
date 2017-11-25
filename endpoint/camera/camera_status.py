import json

from command.camera import cameraStatus
from endpoint.page_request.login_checker import LoginChecker


class CameraStatus:
	def GET(self):
		"""
		Delivers a summary of the DSLR's status..

		Returns:
			outJSON (json): A JSON object containing the consoleFeedback and cameraStatus with the format::

				consoleFeedback (str): Resulting feedback.
				cameraStats (bool): Represents whether the DSLR camera is turned on or off.
		"""
		if LoginChecker.loggedIn():
			data = {}
			data['consoleFeedback'], data['cameraStatus'] = cameraStatus()
			outJSON = json.dumps(data)

			return outJSON