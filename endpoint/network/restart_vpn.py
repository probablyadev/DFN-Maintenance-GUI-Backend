import json

from command.network import check_vpn, restart_vpn
from endpoint.login_checker import LoginChecker


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
            restartFeedback = restart_vpn()
            statusFeedback, data['vpnStatus'] = check_vpn()
            data['consoleFeedback'] = restartFeedback + statusFeedback
            outJSON = json.dumps(data)

            return outJSON
