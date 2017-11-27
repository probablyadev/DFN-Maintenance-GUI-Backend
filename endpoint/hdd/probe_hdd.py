import json
import web

from command.hdd import probe_hdd
from endpoint.login_checker import LoginChecker


class ProbeHDD:
    def GET(self):
        """
        Searches for present drives to format.

        Returns:
            A JSON object with many keys, with the following format::

                {/dev/sdxx : /datax/dev/sdxx}

        Raises:
            web.InternalError
        """
        if LoginChecker.loggedIn():

            try:
                data = probe_hdd()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON
