class RestartModem:
	def GET(self):
		"""
		Restarts the modem network interface.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				internetStatus (bool): Internet connectivity of the system.
		"""
		if LoginChecker.loggedIn():
			data = {}
			restartFeedback = commandSender.restartModem()
			statusFeedback, data['internetStatus'] = commandSender.internetStatus()
			data['consoleFeedback'] = restartFeedback + statusFeedback
			outJSON = json.dumps(data)
			return outJSON