import constants
from command import exec_console_command


def getHostname():
	"""
	Gets the hostname of the system.

	Returns:
		consoleOutput (str): The hostname of the system.
	"""
	consoleOutput = exec_console_command(constants.getHostname)

	return consoleOutput