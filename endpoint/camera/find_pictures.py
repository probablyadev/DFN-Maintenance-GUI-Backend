import json

from command.camera import find_pictures
from endpoint.page_request.login_checker import LoginChecker


class FindPictures:
    def GET(self):
        """
        Fetches the filenames of pictures taken on the date specified.

        Returns:
            fileBankJSON (json): A JSON object with many keys, with the format::

                {filecreationtime : filepath}

        web.input fetches the input date specified by the user.
        """
        if LoginChecker.loggedIn():
            fileBankJSON = find_pictures(web.input())

            return json.dumps(fileBankJSON, sort_keys = True)
