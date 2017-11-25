# GPS UTILITIES

def gpsStatus():
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
	consoleOutput = doConsoleCommand(constants.gpsCheck + constants.getExitStatus)

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


def outputTime():
	"""
	Outputs the current system time to the user.

	Returns:
		consoleOutput (str): Resulting console feedback.
	"""
	consoleOutput = doConsoleCommand(constants.outputTime)

	return consoleOutput + "\n"


def timezoneChange(timezone):
	"""
	Changes the system's timezone.

	Args:
		timezone (str): Timezone information to change the system's timezone to.

	Returns:
		constants.timezoneChanged (str): Resulting feedback.
	"""
	command = constants.setTimezone
	doConsoleCommand(command.format(timezone))

	return constants.timezoneChanged.format(timezone)