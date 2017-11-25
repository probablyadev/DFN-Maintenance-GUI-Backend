import json

from command.network import check_vpn
from endpoint.page_request.login_checker import LoginChecker


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
            statusFeedback, data['vpnStatus'] = check_vpn()
            data['consoleFeedback'] = restartFeedback + statusFeedback
            outJSON = json.dumps(data)

            return outJSON
