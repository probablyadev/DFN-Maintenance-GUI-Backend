# ADVANCED UTILITIES
from backend import constants
from command import exec_console_command


def get_log(directory):
    """
    Fetches the file path of a text logfile on the file system.

    Args:
        directory (str): The directory to get the logfile from. Format::

            /data0/ + directory

    Returns:
        foundFile (str): The file path of the found logfile.
    """
    filenames = exec_console_command(constants.getLogfileName.format(directory))
    foundfile = filenames.split('\n')[0]

    return foundfile
