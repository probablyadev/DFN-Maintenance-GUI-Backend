import json

from command.hdd import format_hdd
from endpoint.page_request.login_checker import LoginChecker


class FormatHDD:
    def GET(self):
        """
        Formats the specified drives.

        Returns:
            A JSON object with the following variables::

                consoleFeedback (str): User feedback.

        Raises:
            web.InternalError
        """
        if LoginChecker.loggedIn():
            data = {}
            try:
                data['consoleFeedback'] = format_hdd(web.input().args)
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)
            except RuntimeError as e:
                raise web.InternalError(e.message)

            return outJSON
