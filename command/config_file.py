def cfCheck():
	"""
	Checks that a configuration file exists.

	Returns:
		consoleOutput (str): Resulting console output.

	Raises:
		IOError
	"""
	consoleOutput = doConsoleCommand(constants.cfcheck)

	if re.search("[0-9]", consoleOutput):
		return consoleOutput
	else:
		raise IOError(constants.cfCheckScriptNotFound)