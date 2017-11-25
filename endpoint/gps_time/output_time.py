class OutputTime:
	def GET(self):
		"""
		Outputs the current system time to the user.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback including the current system time.
		"""
		if LoginChecker.loggedIn():
			data = {}
			data['consoleFeedback'] = commandSender.outputTime()
			outJSON = json.dumps(data)
			return outJSON