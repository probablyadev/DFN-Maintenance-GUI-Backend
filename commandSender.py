"""""
 * * * * * * * * * *
 * Filename:    commandSender.py
 *
 * Purpose:     Responsible for running commands on each Camera, returns appropriate
 *              console output.
 *
 * Copyright:   2017 Fireballs in the Sky, all rights reserved
 *
 * * * * * * * * * *
"""""

import calendar
import subprocess
import datetime
import inspect
import os
import sys
import re
import time
from os import remove, close
from shutil import move
from tempfile import mkstemp

import constants

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import dfn_functions


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