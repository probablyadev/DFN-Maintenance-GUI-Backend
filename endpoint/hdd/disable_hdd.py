class DisableHDD:
	def GET(self):
		"""
		Switches the camera's external hard drives off.

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
				data['consoleFeedback'] = commandSender.hddOff()
				statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data[
					'HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
				data['consoleFeedback'] += statusFeedback
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)
			except RuntimeError as e:
				raise web.InternalError(e.message)

			return outJSON