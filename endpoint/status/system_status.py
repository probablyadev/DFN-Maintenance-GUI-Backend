import json
import constants
from command.camera import cameraStatus
from command.gps_time import outputTime, gpsStatus
from command.hdd import hddStatus
from command.network import internetStatus, vpnStatus
from endpoint.page_request.login_checker import LoginChecker


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
				datetime = outputTime()
				cameraFeedback, cameraBoolean = cameraStatus()
				gpsFeedback, gpsBoolean = gpsStatus()
				internetFeedback, internetBoolean = internetStatus()
				extHDDFeedback, hdd0Boolean, hdd0Space, hdd1Boolean, hdd2Boolean, hdd3Boolean, hdd1Space, hdd2Space, hdd3Space = hddStatus()
				vpnFeedback, vpnBoolean = vpnStatus()

				# Encode to JSON
				data = {}
				data['consoleFeedback'] = constants.systemStatusHeader + datetime + cameraFeedback + extHDDFeedback + internetFeedback + vpnFeedback + gpsFeedback
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