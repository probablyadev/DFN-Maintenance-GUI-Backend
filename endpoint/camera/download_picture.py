import json

from command.camera import downloadPicture
from endpoint.page_request.login_checker import LoginChecker


class DownloadPicture:
	def GET(self):
		"""
		Fetches the specified .NEF file for the user to download.

		Returns:
			outJSON (json): Format::

				{success : boolean}

		Raises:
			web.NotFound

		web.input fetches the filepath for download.
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['success'] = downloadPicture(web.input())
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.NotFound(e.message)

			return outJSON