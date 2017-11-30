import json

from command.gps import output_time
from endpoint.login_checker import LoginChecker


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
            data['consoleFeedback'] = output_time()
            outJSON = json.dumps(data)

            return outJSON
