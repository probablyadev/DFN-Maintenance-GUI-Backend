import json
import web

from command.gps_time import timezone_change
from endpoint.login_checker import LoginChecker


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
            data['consoleFeedback'] = timezone_change(timezone)
            outJSON = json.dumps(data)

            return outJSON
