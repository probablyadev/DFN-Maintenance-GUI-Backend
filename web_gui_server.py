"""""
 * * * * * * * * * *
 * Filename:    web_gui_server.py
 *
 * Purpose:     HTTP Server for DFN Cameras to serve the DFN Maintenance GUI
 *
 * Copyright:   2017 Fireballs in the Sky, all rights reserved
 *
 * * * * * * * * * *
"""""
# !/usr/bin/env python

import base64
import commandSender
import datetime
import json
import model
import os

import web
from web import form

import constants

# Initialising web.py config variables
web.config.debug = False
web.config.session_parameters['timeout'] = 3600

# Initialising web.py app object
urls = ('/', 'Index',
		'/app', 'UI',
		'/logout', 'Logout',
		'/gethostname', 'GetHostname',
		'/cameraon', 'CameraOn',
		'/cameraoff', 'CameraOff',
		'/videocameraon', 'VideoCameraOn',
		'/videocameraoff', 'VideoCameraOff',
		'/camerastatus', 'CameraStatus',
		'/findpictures', 'FindPictures',
		'/downloadpicture', 'DownloadPicture',
		'/removethumbnail', 'RemoveThumbnail',
		'/downloadthumbnail', 'DownloadThumbnail',
		'/gpscheck', 'GPSCheck',
		'/timezonechange', 'TimezoneChange',
		'/outputTime', 'OutputTime',
		'/cfcheck', 'CFCheck',
		'/intervaltest', 'IntervalTest',
		'/previntervaltest', 'PrevIntervalTest',
		'/enablehdd', 'EnableHDD',
		'/disablehdd', 'DisableHDD',
		'/mounthdd', 'MountHDD',
		'/unmounthdd', 'UnmountHDD',
		'/probehdd', 'ProbeHDD',
		'/movedata0', 'MoveData0',
		'/formathdd', 'FormatHDD',
		'/smarttest', 'SmartTest',
		'/hddcheck', 'CheckHDD',
		'/internetcheck', 'InternetCheck',
		'/restartmodem', 'RestartModem',
		'/vpncheck', 'VPNCheck',
		'/restartvpn', 'RestartVPN',
		'/systemstatus', 'SystemStatus',
		'/statusconfig', 'StatusConfig',
		'/getlatestlog', 'LatestLog',
		'/getlatestprevlog', 'LatestPrevLog',
		'/populateconfigbox', 'PopulateConfigBox',
		'/updateconfigfile', 'UpdateConfigFile')
app = web.application(urls, globals())


# Custom http response messages
def notfound():
	return web.notfound("The requested file(s) could not be found.")


app.notfound = notfound

# Initialising useful web.py framework variables
render = web.template.render('templates/')
session = web.session.Session(app, web.session.DiskStore('sessions/'))

# Variable for the login form.
loginForm = form.Form(
		form.Textbox("username", description = 'Username:'),
		form.Password("password", description = 'Password:'),
		form.Button('Login'))


# Classes for handling page requests and login

class Index:
	def GET(self):
		"""
		Servers the request for the login page.

		Returns:
			The rendered HTML of the login template.
		"""
		f = loginForm()

		return render.login(f, '')

	def POST(self):
		"""
		Handles login form submission.

		Returns:
			The rendered HTML of the failed login page.

		On success, calls Login.login to raise the HTML of the Maintenance GUI.

		The login form data is extracted by web.py.
		"""
		f = loginForm()

		if f.validates():  # If form lambdas are valid
			if model.loginAuth(f.d.username, f.d.password):
				Login.login()
			else:
				return render.login(f, 'ERROR: Incorrect credentials.')
		else:
			return render.login(f, 'ERROR: Form entry invalid.')


class UI:
	def GET(self):
		"""
		Renders the maintenance GUI.

		Returns:
			The rendered HTML of the maintenance GUI.
		"""
		if LoginChecker.loggedIn():
			hostname = commandSender.getHostname()

			return render.app(hostname)


class Login:
	@staticmethod
	def login():
		"""
		Logs the user in by manipulating their session.

		Raises:
			 web.seeother: Raises the '/app' endpoint to the client.
		"""
		session.logged_in = True
		raise web.seeother('/app')


class Logout:
	def GET(self):
		"""
		Logs the user out by manipulating their session.


		Raises:
			web.seeother: Raises the '/' endpoint to the client.
		"""
		session.logged_in = False
		raise web.seeother('/')


class LoginChecker:
	@staticmethod
	def loggedIn():
		"""
		Checks whether the user's session is logged in.

		Returns:
			True for logged in, or raises the / endpoint if not logged in.

		Raises:
			web.seeother: Raises the '/' endpoint if not logged in.
		"""
		if session.get('logged_in', False):
			return True
		else:
			raise web.seeother('/')


class GetHostname:
	def GET(self):
		"""
		Gets the hostname of the current DFN camera.

		Returns:
			data (json): A JSON object representing the hostname with the format::

				{hostname : "DFNXXX"}
		"""
		data = {}
		data['hostname'] = commandSender.getHostname()

		return json.dumps(data)


# Classes for handling camera functionality

# Camera
class CameraOn:
	def GET(self):
		"""
		Switches the DSLR camera on.

		Returns:
			outJSON (json): A JSON object containing the consoleFeedback and cameraStatus with the format::

				consoleFeedback (str): Resulting feedback.
				cameraStats (bool): Represents whether the DSLR camera is turned on or off.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['consoleFeedback'] = commandSender.cameraOn()
				statusFeedback, statusBoolean = commandSender.cameraStatus()
				data['consoleFeedback'] += statusFeedback
				data['cameraStatus'] = statusBoolean
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


class CameraOff:
	def GET(self):
		"""
		Switches the DSLR camera off.

		Returns:
			outJSON (json): A JSON object containing the consoleFeedback and cameraStatus with the format::

				consoleFeedback (str): Resulting feedback.
				cameraStats (bool): Represents whether the DSLR camera is turned on or off.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['consoleFeedback'] = commandSender.cameraOff()
				statusFeedback, statusBoolean = commandSender.cameraStatus()
				data['consoleFeedback'] += statusFeedback
				data['cameraStatus'] = statusBoolean
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


class VideoCameraOn:
	def GET(self):
		"""
		Switches the video camera on.

		Returns:
			outJSON (json): A JSON object containing the consoleFeedback::

				consoleFeedback (str): Resulting feedback.

		Raises:
			web.InternalError

		Doesn't return a boolean yet, because a way to detect the video camera's presence is still to be implemented.
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['consoleFeedback'] = commandSender.videoCameraOn()
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


class VideoCameraOff:
	def GET(self):
		"""
		Switches the video camera off.

		Returns:
			outJSON (json): A JSON object containing the consoleFeedback::

				consoleFeedback (str): Resulting feedback.

		Raises:
			web.InternalError

		Doesn't return a boolean yet, because a way to detect the video camera's presence is still to be implemented.
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['consoleFeedback'] = commandSender.videoCameraOff()
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


class CameraStatus:
	def GET(self):
		"""
		Delivers a summary of the DSLR's status..

		Returns:
			outJSON (json): A JSON object containing the consoleFeedback and cameraStatus with the format::

				consoleFeedback (str): Resulting feedback.
				cameraStats (bool): Represents whether the DSLR camera is turned on or off.
		"""
		if LoginChecker.loggedIn():
			data = {}
			data['consoleFeedback'], data['cameraStatus'] = commandSender.cameraStatus()
			outJSON = json.dumps(data)

			return outJSON


class FindPictures:
	def GET(self):
		"""
		Fetches the filenames of pictures taken on the date specified.

		Returns:
			fileBankJSON (json): A JSON object with many keys, with the format::

				{filecreationtime : filepath}

		web.input fetches the input date specified by the user.
		"""
		if LoginChecker.loggedIn():
			fileBankJSON = commandSender.findPictures(web.input())

			return json.dumps(fileBankJSON, sort_keys = True)


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
				data['success'] = commandSender.downloadPicture(web.input())
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.NotFound(e.message)

			return outJSON


class DownloadThumbnail:
	def GET(self):
		"""
		Fetches the specified .jpg file for the user to download.

		Returns:
			outJSON (json): Format::

				{success : boolean}

		Raises:
			web.NotFound

		web.input fetches the filepath for jpg extraction.
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['success'] = commandSender.downloadThumbnail(web.input())
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.NotFound(e.message)

			return outJSON


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


# Hard drives
class EnableHDD:
	def GET(self):
		"""
		Switches the camera's external hard drives on.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				HDD(0 - 3)Status (int): Status of each external hard drive.
				HDD(0 - 3)Space (int): Represents occupied space of each external hard drive.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}
			try:
				data['consoleFeedback'] = commandSender.hddOn()
				statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data[
					'HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
				data['consoleFeedback'] += statusFeedback
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


class DisableHDD:
	def GET(self):
		"""
		Switches the camera's external hard drives off.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				HDD(0 - 3)Status (int): Status of each external hard drive.
				HDD(0 - 3)Space (int): Represents occupied space of each external hard drive.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['consoleFeedback'] = commandSender.hddOff()
				statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data[
					'HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
				data['consoleFeedback'] += statusFeedback
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)
			except RuntimeError as e:
				raise web.InternalError(e.message)

			return outJSON


class MountHDD:
	def GET(self):
		"""
		Mounts the powered HDD's to the filesystem.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				HDD(0 - 3)Status (int): Status of each external hard drive.
				HDD(0 - 3)Space (int): Represents occupied space of each external hard drive.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['consoleFeedback'] = commandSender.mountHDD()
				statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data[
					'HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
				data['consoleFeedback'] += statusFeedback
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


class UnmountHDD:
	def GET(self):
		"""
		Unmount's the powered HDD's to the filesystem.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				HDD(0 - 3)Status (int): Status of each external hard drive.
				HDD(0 - 3)Space (int): Represents occupied space of each external hard drive.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['consoleFeedback'] = commandSender.unmountHDD()
				statusFeedback, data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], data[
					'HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
				data['consoleFeedback'] += statusFeedback
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


class ProbeHDD:
	def GET(self):
		"""
		Searches for present drives to format.

		Returns:
			A JSON object with many keys, with the following format::

				{/dev/sdxx : /datax/dev/sdxx}

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():

			try:
				data = commandSender.probeHDD()
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


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


class FormatHDD:
	def GET(self):
		"""
		Formats the specified drives.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}
			try:
				data['consoleFeedback'] = commandSender.formatHDD(web.input().args)
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)
			except RuntimeError as e:
				raise web.InternalError(e.message)

			return outJSON


class CheckHDD:
	def GET(self):
		"""
		Delivers a summary of the external hard drive's status.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				HDD(0 - 3)Status (int): Status of each external hard drive.
				HDD(0 - 3)Space (int): Represents occupied space of each external hard drive.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['consoleFeedback'], data['HDD0Status'], data['HDD0Space'], data['HDD1Status'], data['HDD2Status'], \
				data['HDD3Status'], data['HDD1Space'], data['HDD2Space'], data['HDD3Space'] = commandSender.hddStatus()
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


class SmartTest:
	def GET(self):
		"""
		Performs a smart test.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.

		Raises:
			web.InternalError
			web.Conflict
		"""
		if LoginChecker.loggedIn():
			data = {}
			try:
				data['consoleFeedback'] = commandSender.smartTest()
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)
			except OSError as e:
				raise web.InternalError(e.message)
			except AssertionError as e:
				raise web.Conflict(e.message)

			return outJSON


# GPS/Time
class GPSCheck:
	def GET(self):
		"""
		Delivers a summary of the GPS status.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				gpstatus (bool): Status of the gps.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			data = {}

			try:
				data['consoleFeedback'], data['gpsStatus'] = commandSender.gpsStatus()
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


class TimezoneChange:
	def GET(self):
		"""
		Changes the system's timezone.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.

		web.input fetches the timezone information from the user.
		"""
		if LoginChecker.loggedIn():
			data = {}
			timezone = web.input().zone
			data['consoleFeedback'] = commandSender.timezoneChange(timezone)
			outJSON = json.dumps(data)
			return outJSON


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


# Network
class InternetCheck:
	def GET(self):
		"""
		Delivers a summary of the internet connectivity of the system.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				internetStatus (bool): Internet connectivity of the system.
		"""
		if LoginChecker.loggedIn():
			data = {}
			data['consoleFeedback'], data['internetStatus'] = commandSender.internetStatus()
			outJSON = json.dumps(data)
			return outJSON


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


# Status/Advanced
class StatusConfig:
	def GET(self):
		"""
		Serves the dfnstation.cfg file to the user to read.

		Returns:
			result (str): A Base64 encoded string containing the contents of dfnstation.cfg.

		Raises:
			web.notfound
		"""
		if LoginChecker.loggedIn():
			path = constants.dfnconfigPath
			if os.path.exists(path):
				getFile = file(path, 'rb')
				web.header('Content-type', 'application/octet-stream')
				web.header('Content-transfer-encoding', 'base64')
				return base64.standard_b64encode(getFile.read())
			else:
				raise web.notfound()


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


class LatestPrevLog:
	def GET(self):
		"""
		Serves the second-latest logfile from interval control.

		Returns:
			A JSON object with the following variables::

				file (str): The contents of the logfile.
				timestamp (str): The timestamp that the logfile was last modified.

		Raises:
			web.notfound
		"""
		if LoginChecker.loggedIn():
			path = "/data0/latest_prev/" + commandSender.getLog("latest_prev")
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


class PopulateConfigBox:
	def GET(self):
		"""
		Serves information to fill in the interface for changing the dfnstation.cfg file.

		Returns:
			A JSON object with the following format::

				{param : value}

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			try:
				data = {}
				data = commandSender.populateConfigBox()
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


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


class SystemStatus:
	def GET(self):
		"""
		Provides an overall status of the system to the user.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				cameraStatus (bool): Represents the camera's status.
				gpsStatus (bool): Represents the GPS's status.
				internetStatus (bool): Represents the internet connectivity of the system.
				vpnStatus (bool): Represents the VPN connectivity of the system.
				HDD(0 - 3)Status (int): Status of each external hard drive.
				HDD(0 - 3)Space (int): Represents occupied space of each external hard drive.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			# Check status of system
			try:
				datetime = commandSender.outputTime()
				cameraFeedback, cameraBoolean = commandSender.cameraStatus()
				gpsFeedback, gpsBoolean = commandSender.gpsStatus()
				internetFeedback, internetBoolean = commandSender.internetStatus()
				extHDDFeedback, hdd0Boolean, hdd0Space, hdd1Boolean, hdd2Boolean, hdd3Boolean, hdd1Space, hdd2Space, hdd3Space = commandSender.hddStatus()
				vpnFeedback, vpnBoolean = commandSender.vpnStatus()

				# Encode to JSON
				data = {}
				data[
					'consoleFeedback'] = constants.systemStatusHeader + datetime + cameraFeedback + extHDDFeedback + internetFeedback + vpnFeedback + gpsFeedback
				data['cameraStatus'] = cameraBoolean
				data['gpsStatus'] = gpsBoolean
				data['internetStatus'] = internetBoolean
				data['vpnStatus'] = vpnBoolean
				data['HDD0Status'] = hdd0Boolean
				data['HDD1Status'] = hdd1Boolean
				data['HDD2Status'] = hdd2Boolean
				data['HDD3Status'] = hdd3Boolean
				data['HDD0Space'] = hdd0Space
				data['HDD1Space'] = hdd1Space
				data['HDD2Space'] = hdd2Space
				data['HDD3Space'] = hdd3Space
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


# Configuration File Check
class CFCheck:
	def GET(self):
		"""
		Performs a configuration file check.

		Returns:
			A JSON object with the following variables::

				images (str): Resulting images.

		Raises:
			web.InternalError

		TODO: Update documentation.
		"""
		if LoginChecker.loggedIn():
			try:
				data = {}
				data['images'] = commandSender.cfCheck()
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


# Interval Control Test
class IntervalTest:
	def GET(self):
		"""
		Performs an interval control test on the system.

		Returns:
			A JSON object with the following variables::

				consoleFeedback (str): User feedback.
				intervalTestResult (bool): Represents whether or not the test passed or failed.

		Raises:
			web.InternalError
		"""
		if LoginChecker.loggedIn():
			try:
				data = {}
				data['consoleFeedback'], data['intervalTestResult'] = commandSender.intervalTest()
				outJSON = json.dumps(data)
			except IOError as e:
				raise web.InternalError(e.message)

			return outJSON


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


# Start of execution
if __name__ == "__main__":
	# Gets the DEV_ENVIRONMENT variable set within pycharms environment variables configuration script
	# If True then this script is being run on a dev machine, if false then it's running on a camera
	# Defaults to false
	environment = os.getenv('DEV_ENVIRONMENT', False)

	if environment is False:
		os.chdir("/opt/dfn-software/Desert-Fireball-Maintainence-GUI")

	app.run()
