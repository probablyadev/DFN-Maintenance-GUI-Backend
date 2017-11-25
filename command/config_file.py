import re

import constants
from command import exec_console_command


def cfCheck():
	"""
	Checks that a configuration file exists.

	Returns:
		consoleOutput (str): Resulting console output.

	Raises:
		IOError
	"""
	consoleOutput = exec_console_command(constants.cfcheck)

	if re.search("[0-9]", consoleOutput):
		return consoleOutput
	else:
		raise IOError(constants.cfCheckScriptNotFound)