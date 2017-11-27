import json
import web

from command.camera import video_camera_off
from endpoint.login_checker import LoginChecker


class VideoCameraOff:
    def GET(self):
        """
        Switches the video camera off.

        Returns:
            outJSON (json): A JSON object containing the consoleFeedback::

                consoleFeedback (str): Resulting feedback.

        Raises:
            web.InternalError

        Doesn't return a boolean yet, because a way to detect the video camera's presence is still to be implemented.
        """
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = video_camera_off()
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON
