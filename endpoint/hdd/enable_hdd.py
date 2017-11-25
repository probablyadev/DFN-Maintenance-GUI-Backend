import json

from command.hdd import hddStatus
from endpoint.page_request.login_checker import LoginChecker


class EnableHDD:
	def GET(self):
		"""
		Switches the camera's external hard drives on.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				HDD(0 - 3)Status (int): Status of each external hard drive.
				HDD(0 - 3)Space (int): Represents occupied space of each external hard drive.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}
			try:
				data['consoleFeedback'] = commandSender.hddOn()
				statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data[
					'HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = hddStatus()
				data['consoleFeedback'] += statusFeedback
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON