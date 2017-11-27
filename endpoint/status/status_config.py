# Status/Advanced
import base64
import os

import constants
from endpoint.page_request.login_checker import LoginChecker


class StatusConfig:
    def GET(self):
        """
        Serves the dfnstation.cfg file to the user to read.

        Returns:
            result (str): A Base64 encoded string containing the contents of dfnstation.cfg.

        Raises:
            web.notfound
        """
        if LoginChecker.loggedIn():
            path = constants.dfnconfigPath

            if os.path.exists(path):
                getFile = file(path, 'rb')
                web.header('Content-type', 'application/octet-stream')
                web.header('Content-transfer-encoding', 'base64')

                return base64.standard_b64encode(getFile.read())
            else:
                raise web.notfound()
