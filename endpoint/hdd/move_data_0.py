class MoveData0:
	def GET(self):
		"""
		Moves /data0 data to the external drives.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			try:
				data = {
					'consoleFeedback': commandSender.moveData0()
				}
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON