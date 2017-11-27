import json
import web

from command.camera import download_picture
from endpoint.login_checker import LoginChecker


class DownloadPicture:
    def GET(self):
        """
        Fetches the specified .NEF file for the user to download.

        Returns:
            outJSON (json): Format::

                {success : boolean}

        Raises:
            web.NotFound

        web.input fetches the filepath for download.
        """
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['success'] = download_picture(web.input())
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.NotFound(e.message)

            return outJSON
