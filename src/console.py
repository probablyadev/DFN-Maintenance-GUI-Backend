import inspect
import os
import sys
from subprocess import check_output, STDOUT
from flask import jsonify


def console(command):
	"""
	Sends the system a console command to execute in bash.

	Args:
		command (str): A console command to execute.

	Returns:
		(str): The console output.
	"""
	return check_output(command, shell = True, stderr = STDOUT, executable = '/bin/bash', universal_newlines = True)

def toJson(error):
	return jsonify(cmd = error.cmd, returncode = error.returncode, output = error.output)
