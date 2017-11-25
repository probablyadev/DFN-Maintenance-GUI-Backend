# NETWORK UTILITIES
import re
import constants
from command import exec_console_command


def internetStatus():
	"""
	Delivers a summary of the internet connectivity of the system.

	Returns:
		feedbackOutput (str): Resulting feedback.
		internetStatus (bool): Represents the internet connectivity of the system.
	"""
	consoleOutput = exec_console_command(constants.internetCheck)

	# Parse output for results
	status = False
	feedbackOutput = constants.internetCheckFailed

	if "unknown" not in consoleOutput and "failure" not in consoleOutput:
		splitOutput = re.split(",", consoleOutput)

		if "0" not in splitOutput[1]:
			status = True
			ipAddress = exec_console_command(constants.getInternetIP)
			feedbackOutput = constants.internetCheckPassed.format(ipAddress)

	return feedbackOutput, status


def restartModem():
	"""
	Restarts the modem network interface.

	Returns:
		feedbackOutput (str): Resulting feedback.
	"""
	consoleOutput = exec_console_command(constants.restartModem)

	# Parse output for results
	feedbackOutput = constants.modemRestartFailed

	if "SUCCESS" in consoleOutput:
		feedbackOutput = constants.modemRestartPassed

	return feedbackOutput


def restartVPN():
	"""
	Restarts the system's VPN daemon.

	Returns:
		feedbackOutput (str): Resulting feedback.
	"""
	consoleOutput = exec_console_command(constants.restartVPN)

	# Parse output for results
	feedbackOutput = constants.vpnRestartFailed

	if "SUCCESS" in consoleOutput:
		feedbackOutput = constants.vpnRestartPassed

	return feedbackOutput


def vpnStatus():
	"""
	Delivers a summary of the VPN connectivity of the system.

	Returns:
		feedbackOutput (str): Resulting feedback.
		vpnStatus (bool): Represents the VPN connectivity of the system.
	"""
	consoleOutput = exec_console_command(constants.vpnCheck)

	# Parse output for results
	status = False
	feedbackOutput = constants.vpnCheckFailed

	if "0" not in re.split(",", consoleOutput)[1]:
		status = True
		ipAddress = exec_console_command(constants.getVpnIP)
		feedbackOutput = constants.vpnCheckPassed.format(ipAddress)

	return feedbackOutput, status
