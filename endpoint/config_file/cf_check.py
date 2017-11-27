import json
import web

from command.config_file import cf_check
from endpoint.login_checker import LoginChecker


class CFCheck:
    def GET(self):
        """
        Performs a configuration file check.

        Returns:
            A JSON object with the following variables::

                images (str): Resulting images.

        Raises:
            web.InternalError

        TODO: Update documentation.
        """
        if LoginChecker.loggedIn():
            try:
                data = {}
                data['images'] = cf_check()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON
