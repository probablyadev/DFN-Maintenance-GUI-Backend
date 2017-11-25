class PrevIntervalTest:
	def GET(self):
		"""
		Checks the /latest folder to see if the camera took pitures the last time the interval control ran.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			try:
				data = {}
				data['consoleFeedback'] = commandSender.prevIntervalTest()
				outJSON = json.dumps(data)
			except AttributeError as e:
				raise web.InternalError('Latest photo directory (/data0/latest) corrupt or not present.')

			return outJSON