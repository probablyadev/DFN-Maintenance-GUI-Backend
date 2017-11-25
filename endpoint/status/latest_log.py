import json
import os

import datetime

from __builtin__ import file

import commandSender
from endpoint.page_request.login_checker import LoginChecker


class LatestLog:
	def GET(self):
		"""
		Serves the latest logfile from interval control.

		Returns:
			A JSON object with the following variables::

				file (str): The contents of the logfile.
				timestamp (str): The timestamp that the logfile was last modified.

		Raises:
			web.notfound
		"""
		if LoginChecker.loggedIn():
			path = "/data0/latest/" + commandSender.getLog("latest")

			if os.path.exists(path):
				data = {}
				getFile = file(path, 'rb')
				data['file'] = getFile.read()
				filestate = os.stat(path)
				data['timestamp'] = datetime.datetime.fromtimestamp(filestate.st_mtime).strftime('%d-%m-%Y %H:%M:%S')
				outJSON = json.dumps(data)

				return outJSON
			else:
				raise web.notfound()