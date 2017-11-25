class RemoveThumbnail:
	def GET(self):
		"""
		Deletes the specified thumbnail from the camera's filesystem.

		Returns:
			(int): 0.

		Raises:
			web.InternalError

		web.input fetches the filepath to delete..
		"""
		if LoginChecker.loggedIn():

			try:
				commandSender.removeThumbnail(web.input())
			except IOError as e:
				raise web.InternalError(e.message)

			return 0
