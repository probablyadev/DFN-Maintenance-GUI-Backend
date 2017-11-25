import json

from command.gps_time import gps_check
from endpoint.page_request.login_checker import LoginChecker


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
                data['consoleFeedback'], data['gpsStatus'] = gps_check()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON
