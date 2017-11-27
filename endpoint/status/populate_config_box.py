import json

from command.status import populate_config_box
from endpoint.page_request.login_checker import LoginChecker


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
                data = populate_config_box()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON
