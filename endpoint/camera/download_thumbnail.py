import json
import web

from command.camera import download_thumbnail
from endpoint.login_checker import LoginChecker


class DownloadThumbnail:
    def GET(self):
        """
        Fetches the specified .jpg file for the user to download.

        Returns:
            outJSON (json): Format::

                {success : boolean}

        Raises:
            web.NotFound

        web.input fetches the filepath for jpg extraction.
        """
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['success'] = download_thumbnail(web.input())
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.NotFound(e.message)

            return outJSON
