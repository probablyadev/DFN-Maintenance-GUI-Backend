# INTERVAL TEST UTILITIES
import datetime
import re

import constants

from command import exec_console_command


def interval_test():
    """
    Performs an interval control test on the system.

    Returns:
        feedbackOutput (str): Resulting feedback.
        status (bool): Represents if the test passed or failed.

    Raises:
        IOError
    """
    # Do interval test command
    consoleOutput = exec_console_command(constants.intervalTest + constants.getExitStatus)

    if "\n127" in consoleOutput:
        raise IOError(constants.intervalControlTestScriptNotFound)

    # Check /data0/latest_prev for correct number of NEF files
    status = False
    feedbackOutput = constants.intervalTestFailed

    consoleOutput = exec_console_command(constants.checkIntervalResults)

    if consoleOutput in ["6", "7", "8"]:  # NOTE: 7 +/- 1 is the required margin of error.
        status = True
        feedbackOutput = constants.intervalTestPassed

    return feedbackOutput, status


def prev_interval_test():
    """
    Checks the /latest folder to see if the camera took pictures the last time the interval control ran.

    Returns:
        consoleFeedback (str): Resulting console feedback.
    """
    # Get current date
    currDate = datetime.datetime.now()
    consoleFeedback = constants.prevIntervalNotRun

    # Do console command to find mod date of latest
    latestDateUnparsed = exec_console_command(constants.checkPrevIntervalStatus)
    latestDateParsed = re.search('\d{4}-\d{2}-\d{2}', latestDateUnparsed).group(0)
    latestDateSplit = re.split("-", latestDateParsed)

    if currDate.day == int(latestDateSplit[2]) and currDate.month == int(latestDateSplit[1]) and currDate.year == int(
        latestDateSplit[0]):
        consoleFeedback = constants.prevIntervalDidRun

    return consoleFeedback
