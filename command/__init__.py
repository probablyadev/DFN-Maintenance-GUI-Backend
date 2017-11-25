import subprocess
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def doConsoleCommand(command):
	"""
	Sends the system a console command to execute in bash.

	Args:
		command (str): A console command.

	Returns:
		outputText (str): The console output.
	"""
	outputText = subprocess.check_output(command)[1]

	return outputText