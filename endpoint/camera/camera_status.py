import json

from command.camera import camera_status
from endpoint.login_checker import LoginChecker


class CameraStatus:
    def GET(self):
        """
        Delivers a summary of the DSLR's status..

        Returns:
            outJSON (json): A JSON object containing the consoleFeedback and cameraStatus with the format::

                consoleFeedback (str): Resulting feedback.
                cameraStats (bool): Represents whether the DSLR camera is turned on or off.
        """
        if LoginChecker.loggedIn():
            data = {}
            data['consoleFeedback'], data['cameraStatus'] = camera_status()
            outJSON = json.dumps(data)

            return outJSON
