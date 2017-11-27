import json
import web

from command.interval_control_test import interval_test
from endpoint.login_checker import LoginChecker


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
                data['consoleFeedback'], data['intervalTestResult'] = interval_test()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON
