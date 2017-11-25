import json

import commandSender


class GetHostname:
    def GET(self):
        """
        Gets the hostname of the current DFN camera.

        Returns:
            data (json): A JSON object representing the hostname with the format::

                {hostname : "DFNXXX"}
        """
        data = {}
        data['hostname'] = commandSender.getHostname()

        return json.dumps(data)