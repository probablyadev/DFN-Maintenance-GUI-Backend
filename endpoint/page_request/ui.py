from command.page_request import get_hostname
from endpoint import render
from endpoint.page_request.login_checker import LoginChecker


class UI:
    def GET(self):
        """
        Renders the maintenance GUI.

        Returns:
            The rendered HTML of the maintenance GUI.
        """
        if LoginChecker.loggedIn():
            hostname = get_hostname()

            return render.app(hostname)
