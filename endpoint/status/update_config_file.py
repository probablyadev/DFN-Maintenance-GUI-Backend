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
				data['consoleFeedback'] = commandSender.updateConfigFile(web.input())
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON