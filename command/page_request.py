import constants
from command import doConsoleCommand


def getHostname():
	"""
	Gets the hostname of the system.

	Returns:
		consoleOutput (str): The hostname of the system.
	"""
	consoleOutput = doConsoleCommand(constants.getHostname)

	return consoleOutput