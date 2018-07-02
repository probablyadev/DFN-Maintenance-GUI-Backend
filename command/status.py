# ADVANCED UTILITIES
import datetime
import os

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


def latest_log():
    """Fetches the latest log file."""
    environment = os.getenv('APP_SETTINGS')

    if environment is "prod":
        path = "/data0/latest/" + get_log("latest")
    else:
        import basedir
        path = os.path.join(basedir.basedir, 'dfn-gui-server.log')

    if os.path.exists(path):
        logfile = open(path, 'rb').read()

        file_state = os.stat(path)
        timestamp = datetime.datetime.fromtimestamp(file_state.st_mtime).strftime('%d-%m-%Y %H:%M:%S')

        return logfile, timestamp
    else:
        raise AttributeError("Unable to locate the latest log file: " + path)


def second_latest_log():
    """Fetches the second latest log file."""
    environment = os.getenv('APP_SETTINGS')

    if environment is "prod":
        path = "/data0/latest_prev/" + get_log("latest_prev")
    else:
        import basedir
        path = os.path.join(basedir.basedir, 'dfn-gui-server.log')

    if os.path.exists(path):
        logfile = open(path, 'rb').read()

        file_state = os.stat(path)
        timestamp = datetime.datetime.fromtimestamp(file_state.st_mtime).strftime('%d-%m-%Y %H:%M:%S')

        return logfile, timestamp
    else:
        raise AttributeError("Unable to locate the second latest log file: " + path)
