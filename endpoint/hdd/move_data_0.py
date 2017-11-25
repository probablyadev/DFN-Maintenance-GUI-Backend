import json

from command.hdd import move_data_0
from endpoint.page_request.login_checker import LoginChecker


class MoveData0:
    def GET(self):
        """
        Moves /data0 data to the external drives.

        Returns:
            A JSON object with the following variables::

                consoleFeedback (str): User feedback.

        Raises:
            web.InternalError
        """
        if LoginChecker.loggedIn():
            try:
                data = {'consoleFeedback': move_data_0()}
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON
