class RestartVPN:
	def GET(self):
		"""
		Restarts the system's VPN daemon.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				vpnStatus (bool): VPN connectivity of the system.
		"""
		if LoginChecker.loggedIn():
			data = {}
			restartFeedback = commandSender.restartVPN()
			statusFeedback, data['vpnStatus'] = commandSender.vpnStatus()
			data['consoleFeedback'] = restartFeedback + statusFeedback
			outJSON = json.dumps(data)
			return outJSON