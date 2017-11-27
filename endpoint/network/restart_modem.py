import json

from command.network import internet_check, restart_modem
from endpoint.login_checker import LoginChecker


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
            restartFeedback = restart_modem()
            statusFeedback, data['internetStatus'] = internet_check()
            data['consoleFeedback'] = restartFeedback + statusFeedback
            outJSON = json.dumps(data)

            return outJSON
