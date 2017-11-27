import json
import web

from command.hdd import smart_test
from endpoint.login_checker import LoginChecker


class SmartTest:
    def GET(self):
        """
        Performs a smart test.

        Returns:
            A JSON object with the following variables::

                consoleFeedback (str): User feedback.

        Raises:
            web.InternalError
            web.Conflict
        """
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = smart_test()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)
            except OSError as e:
                raise web.InternalError(e.message)
            except AssertionError as e:
                raise web.Conflict(e.message)

            return outJSON
