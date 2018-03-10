# GPS UTILITIES
import re

from backend import constants
from command import exec_console_command


def gps_check():
    """
    Delivers a summary of the GPS status.

    Returns:
        feedbackOutput (str): Resulting feedback.
        gpstatus (bool): Represents the status of the GPS.

    Raises:
        IOError
    """
    gpsStatusDict = {"1": "Locked", "0": "No lock"}

    # Do command
    consoleOutput = exec_console_command(constants.gpsCheck + constants.getExitStatus)

    if "\n2" in consoleOutput:
        raise IOError(constants.leostickStatusScriptNotFound)

    # Parse output for results
    status = False
    feedbackOutput = constants.gpsCheckFailed

    splitOutput = re.split(',|\n', consoleOutput)

    if len(splitOutput) == 16:
        if splitOutput[6] == "1":
            status = True

        latitude = splitOutput[2].replace(".", "")
        latitude = ("-" if "S" in splitOutput[3] else '') + latitude[:-6] + "." + latitude[-6:]
        longitude = splitOutput[4].replace(".", "")
        longitude = ("-" if "W" in splitOutput[5] else '') + longitude[:-6] + "." + longitude[-6:]
        feedbackOutput = constants.gpsOnline.format(gpsStatusDict[splitOutput[6]], splitOutput[7], latitude, longitude,
                                                    splitOutput[9])

    return feedbackOutput, status
