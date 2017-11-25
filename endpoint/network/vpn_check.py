class VPNCheck:
	def GET(self):
		"""
		Delivers a summary of the VPN connectivity of the system.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				vpnStatus (bool): VPN connectivity of the system.
		"""
		if LoginChecker.loggedIn():
			data = {}
			data['consoleFeedback'], data['vpnStatus'] = commandSender.vpnStatus()
			outJSON = json.dumps(data)
			return outJSON