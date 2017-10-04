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
import commands
import datetime
import inspect
import os
import re
import time
from os import remove, close
from shutil import move
from tempfile import mkstemp

import constants


def doConsoleCommand(command):
	"""
	Sends the system a console command to execute in bash.

	Args:
		command (str): A console command.

	Returns:
		outputText (str): The console output.
	"""
	outputText = commands.getstatusoutput(command)[1]

	return outputText


def getHostname():
	"""
	Gets the hostname of the system.

	Returns:
		consoleOutput (str): The hostname of the system.
	"""
	consoleOutput = doConsoleCommand(constants.getHostname)

	return consoleOutput


# CAMERA UTILITiES

def cameraOn():
	"""
	Swithes the DSLR camera on.

	Returns:
		feedbackOutput (str): Resulting feedback.

	Raises:
		IOError
	"""
	# Do command
	consoleOutput = doConsoleCommand(constants.cameraOn + constants.getExitStatus)

	if "2" in consoleOutput:
		raise IOError(constants.cameraOnScriptNotFound)

	# Parse output
	feedbackOutput = constants.cameraSwitchedOn

	return feedbackOutput


def cameraOff():
	"""
	Switches the DSLR camera off.

	Returns:
		feedbackOutput (str): Resulting feedback.

	Raises:
		IOError
	"""
	# Do command
	consoleOutput = doConsoleCommand(constants.cameraOff + constants.getExitStatus)

	if "2" in consoleOutput:
		raise IOError(constants.cameraOffScriptNotFound)

	# Parse output
	feedbackOutput = constants.cameraSwitchedOff

	return feedbackOutput


def videoCameraOn():
	"""
	Switches the video camera on.

	Returns:
		feedbackOutput (str): Resulting feedback.

	Raises:
		IOError

	Doesn't return a boolean yet, because a way to detect the video camera's presence is
	still to be implemented.
	"""
	# Do command
	consoleFeedback = doConsoleCommand(constants.videoCameraOn + constants.getExitStatus)

	# Parse output
	if "2" in consoleFeedback:
		raise IOError(constants.videoCameraOnScriptNotFound)

	feedbackOutput = constants.videoCameraSwitchedOn

	return feedbackOutput


def videoCameraOff():
	"""
	Switches the video camera off.

	Returns:
		feedbackOutput (str): Resulting feedback.

	Raises:
		IOError

	Doesn't return a boolean yet, because a way to detect the video camera's presence is
	still to be implemented.
	"""
	# Do command
	consoleFeedback = doConsoleCommand(constants.videoCameraOff + constants.getExitStatus)

	# Parse output
	if "2" in consoleFeedback:
		raise IOError(constants.cameraOffScriptNotFound)

	feedbackOutput = constants.videoCameraSwitchedOff

	return feedbackOutput


def cameraStatus():
	"""
	Delivers a summary of the DSLR's status.

	Returns:
		feedbackOutput (str): Resulting feedback.
		status (bool): On / off state of the DSLR camera.
	"""
	# Do command
	consoleOutput = doConsoleCommand(constants.cameraCheck)

	# Parse output for results
	status = False
	feedbackOutput = constants.cameraCheckOff

	if "Nikon Corp." in consoleOutput:
		status = True
		feedbackOutput = constants.cameraCheckOn

	# Encode to JSON
	return feedbackOutput, status


def findPictures(inDate):
	"""
	Fetches the filenames of pictures taken on the date specified.

	Args:
		inDate (date): The date the requested pictures were taken.

	Returns:
		dict. Picture file creation times and paths, the format::

			{filecreationtime : filepath}
	"""
	data = {}
	# Let's do some directory searching!
	day = inDate.day.zfill(2)
	month = inDate.month.zfill(2)
	year = inDate.year
	commandTemplate = constants.findPictures
	command = commandTemplate.format(year, month, day)
	foundDirectories = doConsoleCommand(command)
	directoriesList = foundDirectories.split('\n')

	if directoriesList:
		# Find all dates + times for all directories
		data = {}

		for directory in directoriesList:
			fileList = doConsoleCommand("ls " + directory).split("\n")

			for fileName in fileList:
				if ".NEF" in fileName:
					# Get filepath for NEF file
					filePath = (directory + "/" + fileName)
					# Find timestamp of when photo was taken
					regexSearch = re.search('(?<!\d)\d{6}(?!\d)', filePath)
					fileCreationTime = ""

					if regexSearch:
						fileCreationTime = regexSearch.group(0)
						fileCreationTime = fileCreationTime[:2] + ':' + fileCreationTime[2:]
						fileCreationTime = fileCreationTime[:5] + ':' + fileCreationTime[5:]
						h, m, s = fileCreationTime.split(':')
						seconds = int(h) * 3600 + int(m) * 60 + int(s)
						offset = calendar.timegm(time.localtime()) - calendar.timegm(
							time.gmtime(time.mktime(time.localtime())))
						fileCreationTimeSeconds = seconds + offset
						fileCreationTimeReadable = time.strftime('%H:%M:%S', time.gmtime(fileCreationTimeSeconds))

					data[fileCreationTimeReadable] = filePath

		return data


def downloadPicture(inPath):
	"""
	Fetches the specified .NEF file for the user to download.

	Args:
		inPath (str): The filepath of the file to download.

	Returns:
		success (bool): Represents the success of the request.

	Raises:
		IOError
	"""
	success = False
	consoleFeedback = doConsoleCommand(constants.copyFileToStatic.format(inPath.filepath))
	print(consoleFeedback)

	if "SUCCESS" in consoleFeedback:
		success = True
	else:
		raise IOError(constants.pictureNotFound)

	return success


def downloadThumbnail(inPath):
	"""
	Extracts the thumbnail of the specified .NEF, and serves it to the user.

	Args:
		inPath (str): Filepath of the .NEF file to extract the thumbnail from.

	Returns:
		success (bool): Represents the success of the operation.

	Raises:
		IOError
	"""
	success = False
	consoleFeedback = doConsoleCommand(constants.extractThumbnail.format(inPath.filepath))

	if "SUCCESS" in consoleFeedback:
		success = True
	else:
		raise IOError(constants.pictureNotFound)

	return success


def removeThumbnail(inJSON):
	"""
	Deletes the specified thumbnail from the camera's filesystem.

	Args:
		inJSON (json): A JSON object with the following format::

			{filepath : (filepath)}

	Returns:
		success (bool): Represents the success of the operation.

	Raises:
		IOError
	"""
	time.sleep(2)
	consoleOutput = doConsoleCommand("rm " + inJSON.filepath + ";" + constants.getExitStatus)

	if "\n1" in consoleOutput:
		raise IOError("Thumbnail file doesn't exist to delete. No worries though, it was going to be deleted anyway!")

	return 0


# EXTERNAL HARD DRIVE UTILITIES

def hddOn():
	"""
	Switches the camera's external hard drives on.

	Returns:
		constants.hddCommandedOn (str): Represents the success of the operation.

	Raises:
		IOError
	"""
	# If hardrives already on, get outta here!
	feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()

	if hdd1Status != 0 and hdd2Status != 0:
		return constants.hddAlreadyOn

	# Do command
	consoleOutput = doConsoleCommand(constants.enableHardDrive + constants.getExitStatus)

	if "\n2" in consoleOutput:
		raise IOError(constants.scriptNotFound)

	time.sleep(25)

	# For EXT, re-scan SATA/SCSI hotswap drives
	if "EXT" in getHostname():
		doConsoleCommand(constants.scanSATA)
		time.sleep(2)

	return constants.hddCommandedOn


def hddOff():
	"""
	Switches the camera's external hard drives off.

	Returns:
		feedbackOutput (str): Resulting feedback.

	Raises:
		RuntimeError, IOError
	"""
	devices = ["sdb", "sdc", "sdd"]  # Used for deleting devices in EXTs before powering off

	# If hardrives already off or mounted, get outta here!
	feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()

	if hdd1Status != 1 and hdd2Status != 1:
		return constants.hddNotOnPoweredState

	# For EXT, delete the devices ONLY if they're all not solid state devices.
	if "EXT" in getHostname():
		for device in devices:
			# Check if the device is a solid state or HDD
			driveRotation = doConsoleCommand(constants.extDeleteDriveDevicesCheck.format(device))

			if not re.search("[0-9]", driveRotation):
				raise RuntimeError(
					"External drives are not on correct device label. Use the command line to resolve this.")

			# No exceptions have been raised by this point, so delete drives
		for device in devices:
			doConsoleCommand(constants.extDeleteDriveDevice.format(device))
		time.sleep(1)
	# Then proceed to power off as normal

	# Do command
	consoleOutput = doConsoleCommand(constants.disableHardDrive + constants.getExitStatus)

	if "\n2" in consoleOutput:
		raise IOError(constants.hddOffScriptNotFound)

	if consoleOutput == "0":
		feedbackOutput = constants.hddCommandedOff
	else:
		feedbackOutput = constants.hddOffFailed

	# Sleep if EXT, needs time to remove drives.
	if "EXT" in getHostname():
		time.sleep(22)

	return feedbackOutput


def mountHDD():
	"""
	Mounts the external hard drive's to the file system.

	Returns:
		feedbackOutput (str): Resulting feedback.
	"""
	outputDict = {'/data1': "Drive #1", '/data2': "Drive #2", '/data3': "Drive #3"}
	smalldrives = ['/data1', '/data2']
	extdrives = ['/data1', '/data2', '/data3']
	drives = ['']
	feedbackOutput = ""

	hostname = getHostname()

	if 'EXT' in hostname:
		drives = list(extdrives)
	else:
		drives = list(smalldrives)

	temp, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()
	poweredArray = [hdd1Status, hdd2Status, hdd3Status]

	for idx, drive in enumerate(drives):
		# Do command for drive
		consoleOutput = doConsoleCommand(constants.mountHardDrive.format(drive))

		if "SUCCESS" in consoleOutput:
			if poweredArray[idx] == 0:
				feedbackOutput += constants.hddMountFailed.format(outputDict[drive], constants.hddNotPoweredError)
			else:
				feedbackOutput += constants.hddMountPassed.format(outputDict[drive])
		else:
			feedbackOutput += constants.hddMountFailed.format(outputDict[drive], constants.hddAlreadyMountedError)

	return feedbackOutput


def unmountHDD():
	"""
	Unmounts the external hard drive's from the file system.

	Returns:
		feedbackOutput (str): Resulting feedback.
	"""
	outputDict = {'/data1': "Drive #1", '/data2': "Drive #2", '/data3': "Drive #3", }
	smalldrives = ['/data1', '/data2']
	extdrives = ['/data1', '/data2', '/data3']
	drives = ['']
	feedbackOutput = ""

	hostname = getHostname()

	if 'EXT' in hostname:
		drives = list(extdrives)
	else:
		drives = list(smalldrives)

	for drive in drives:
		# Do command
		consoleOutput = doConsoleCommand(constants.unmountHardDrive.format(drive))

		# Parse results
		if "SUCCESS" in consoleOutput:
			feedbackOutput += constants.hddUnmountPassed.format(outputDict[drive])
		else:
			feedbackOutput += constants.hddUnmountFailed.format(outputDict[drive], constants.hddAlreadyUnmountedError)

	return feedbackOutput


def probeHDD():
	"""
	Searches for present hard drive's to format.

	Returns:
		data (dict): Format::

			{/dev/sdxx : /datax/dev/sdxx}

	Raises:
		IOError
	"""
	# Do command
	consoleOutput = doConsoleCommand(constants.probeHardDrives)
	data = {}

	# Parse results
	if "no such file or directory" in consoleOutput:
		consoleOutput = doConsoleCommand(constants.probeHardDrivesOLD)

		if "no such file or directory" in consoleOutput:
			raise IOError(constants.hddFormatScriptNotFound)

	firstLine = consoleOutput.split("\n")
	consoleOutput = firstLine[0]
	splitOutput = consoleOutput.split(" ")

	for idx, token in enumerate(splitOutput):
		if "/" in token:
			data[splitOutput[idx + 1]] = token + " " + splitOutput[idx + 1]

	return data


def moveData0():
	"""
	Moves /data0 data to the external drive's.

	Returns:
		consoleFeedback (str): Resulting console feedback.

	Raises:
		IOError
	"""
	command = constants.moveData0

	if "EXT" in getHostname():
		command = constants.moveData0Ext

	consoleOutput = doConsoleCommand(command)

	if "SUCCESS" in consoleOutput:
		consoleFeedback = "Move command successful."
	else:
		raise IOError("Move command unsuccessful.")

	return consoleFeedback


def formatHDD(inDrives):
	"""
	Formats the specified drives.

	Args:
		inDrives (str): A string of arguments for the format hard drive script.

	Returns:
		feedbackOutput (str): Resulting feedback.

	Raises:
		IOError, RuntimeError
	"""
	consoleOutput = doConsoleCommand(constants.formatHardDrive.format(inDrives) + constants.getExitStatus)

	if "\n127" in consoleOutput:
		consoleOutput = doConsoleCommand(constants.formatHardDriveOLD(inDrives) + constants.getExitStatus)

		if "\n127" in consoleOutput:
			raise IOError(constants.hddFormatScriptNotFound)
		elif "is mounted" in consoleOutput:
			raise RuntimeError(constants.hddFormatFailed)
		else:
			feedbackOutput = constants.hddFormatPassed
	elif "is mounted" in consoleOutput:
		raise RuntimeError(constants.hddFormatFailed)
	else:
		feedbackOutput = constants.hddFormatPassed

	return feedbackOutput


def hddStatus():
	"""
	Delivers a summary of the external hard drive's status.

	Returns:
		feedbackOutput (str): Resulting feedback.
		HDD(0 - 3)Status (int): Represents the status of each external hard drive.
		HDD(0 - 3)Space (float): Represents the occupied space of each external hard drive.

	Raises:
		IOError
	"""
	hddStatusDict = {0: constants.hddStatusOff, 1: constants.hddStatusPowered, 2: constants.hddStatusMounted}

	# Do command
	command = constants.mountedStatus
	data1MountedStatus = doConsoleCommand(command.format("/data1"))
	data2MountedStatus = doConsoleCommand(command.format("/data2"))
	data3MountedStatus = doConsoleCommand(command.format("/data3"))

	# Parse output for results
	# NB: Status 0 = Unpowered, Status 1 = Powered, but not mounted, Status 2 = Powered + Mounted
	hdd0Status = 0
	hdd1Status = 0
	hdd2Status = 0
	hdd3Status = 0
	hdd0Space = "N/A"
	hdd1Space = "N/A"
	hdd2Space = "N/A"
	hdd3Space = "N/A"

	if "SUCCESS" in doConsoleCommand(constants.data0PoweredStatus):
		hdd0Status = 2

	# Check if HDDs are powered. Depends on system architecture
	# DFNSMALLs
	if "EXT" not in getHostname():
		poweredStatus = doConsoleCommand(constants.hddPoweredStatus)

		if "JMicron Technology Corp." in poweredStatus:
			hdd1Status = 1
			hdd2Status = 1
			hdd3Status = 0

			if data1MountedStatus == "1":
				hdd1Status = 2

			if data2MountedStatus == "1":
				hdd2Status = 2

			if data3MountedStatus == "1":
				hdd3Status = 2
			# DFNEXTs
	else:
		poweredStatus = doConsoleCommand(constants.hddPoweredStatusExt)

		if "sdb1" in poweredStatus:
			hdd1Status = 1

			if data1MountedStatus == "1":
				hdd1Status = 2

		if "sdc1" in poweredStatus:
			hdd2Status = 1

			if data2MountedStatus == "1":
				hdd2Status = 2

		if "sdd1" in poweredStatus:
			hdd3Status = 1

			if data3MountedStatus == "1":
				hdd3Status = 2

	# Finding remaining space in HDDs
	# If mounted, use df
	if hdd1Status == 2 and hdd2Status == 2:
		outText = doConsoleCommand(constants.hddSpaceLive)

		if outText:
			lines = outText.split('\n')
	# If not mounted, use disk usage file
	else:
		try:
			with open(constants.diskUsagePath) as f:
				lines = f.readlines()
		except IOError:
			stack = inspect.stack()
			frame = stack[1][0]

			if hasattr(frame.f_locals, "self"):
				raise IOError(constants.diskUsageNotFound)
			else:
				feedbackOutput = constants.hddStatusString.format(hddStatusDict[hdd0Status], hdd0Space,
																  hddStatusDict[hdd1Status], hdd1Space,
																  hddStatusDict[hdd2Status], hdd2Space,
																  hddStatusDict[hdd3Status],
																  hdd3Space) + constants.diskUsageNotFound + '\n'

				return feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space

	for line in lines:  # For each line in the file
		fixedLine = re.sub(" +", ",", line)  # Reduce whitespace down to 1

		if line[0] == "/":  # If the line is the title line, ignore it
			splitLine = re.split(",", fixedLine)  # Split into terms
			device = splitLine[5]  # Get mounted name
			spaceAvail = splitLine[4]  # Get space for that mount

			# Check if the data applies, if so assign to variable
			if "/data0" in device:
				hdd0Space = spaceAvail
			if "/data1" in device:
				hdd1Space = spaceAvail
			if "/data2" in device:
				hdd2Space = spaceAvail
			if "/data3" in device:
				hdd3Space = spaceAvail

	feedbackOutput = constants.hddStatusString.format(hddStatusDict[hdd0Status], hdd0Space, hddStatusDict[hdd1Status],
													  hdd1Space, hddStatusDict[hdd2Status], hdd2Space,
													  hddStatusDict[hdd3Status], hdd3Space)

	return feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space


def smartTest():
	"""
	Performs a smart test.

	Returns:
		feedbackOutput (str): Resulting feedback.

	Raises:
		AssertionError
		OSError
	"""
	smalldrives = ["usbjmicron,00", "usbjmicron,01"]
	successfuldrives = list(smalldrives)
	output = {}
	feedbackOutput = ""

	# If hardrives off or not mounted, get outta here!
	feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()

	try:
		assert hdd1Status == 0 and hdd2Status == 0
	except AssertionError:
		raise AssertionError(constants.smartTestNotPowereredError)

	# Start all smart tests
	for drive in smalldrives:
		consoleOutput = doConsoleCommand(constants.runSmartTest.format(drive) + constants.getExitStatus)

		if "\n127" in consoleOutput:
			raise OSError(constants.smartTestCommandNotInstalled)

		elif "\n0" in consoleOutput:
			output.update({drive: constants.smartTestStartedSuccess.format(drive)})

		else:
			output.update({drive: constants.smartTestStartedFailed.format(drive)})
			successfuldrives.remove(drive)

	# Wait for completion
	if successfuldrives:
		# Sleep while smart test performs
		time.sleep(70)

		# Evaluate results
		for drive in successfuldrives:
			consoleOutput = doConsoleCommand(constants.checkSmartTest.format(drive))

			if "No Errors Logged" in consoleOutput:
				output[drive] += constants.smartTestResultsPassed.format(drive)
			else:
				output[drive] += constants.smartTestResultsFailed.format(drive)

	for drive in smalldrives:
		feedbackOutput += output[drive]

	return feedbackOutput


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


def outputTime():
	"""
	Outputs the current system time to the user.

	Returns:
		consoleOutput (str): Resulting console feedback.
	"""
	consoleOutput = doConsoleCommand(constants.outputTime)

	return consoleOutput + "\n"


# NETWORK UTILITIES

def internetStatus():
	"""
	Delivers a summary of the internet connectivity of the system.

	Returns:
		feedbackOutput (str): Resulting feedback.
		internetStatus (bool): Represents the internet connectivity of the system.
	"""
	consoleOutput = doConsoleCommand(constants.internetCheck)

	# Parse output for results
	status = False
	feedbackOutput = constants.internetCheckFailed

	if "unknown" not in consoleOutput and "failure" not in consoleOutput:
		splitOutput = re.split(",", consoleOutput)

		if "0" not in splitOutput[1]:
			status = True
			ipAddress = doConsoleCommand(constants.getInternetIP)
			feedbackOutput = constants.internetCheckPassed.format(ipAddress)

	return feedbackOutput, status


def restartModem():
	"""
	Restarts the modem network interface.

	Returns:
		feedbackOutput (str): Resulting feedback.
	"""
	consoleOutput = doConsoleCommand(constants.restartModem)

	# Parse output for results
	feedbackOutput = constants.modemRestartFailed

	if "SUCCESS" in consoleOutput:
		feedbackOutput = constants.modemRestartPassed

	return feedbackOutput


def vpnStatus():
	"""
	Delivers a summary of the VPN connectivity of the system.

	Returns:
		feedbackOutput (str): Resulting feedback.
		vpnStatus (bool): Represents the VPN connectivity of the system.
	"""
	consoleOutput = doConsoleCommand(constants.vpnCheck)

	# Parse output for results
	status = False
	feedbackOutput = constants.vpnCheckFailed

	if "0" not in re.split(",", consoleOutput)[1]:
		status = True
		ipAddress = doConsoleCommand(constants.getVpnIP)
		feedbackOutput = constants.vpnCheckPassed.format(ipAddress)

	return feedbackOutput, status


def restartVPN():
	"""
	Restarts the system's VPN daemon.

	Returns:
		feedbackOutput (str): Resulting feedback.
	"""
	consoleOutput = doConsoleCommand(constants.restartVPN)

	# Parse output for results
	feedbackOutput = constants.vpnRestartFailed

	if "SUCCESS" in consoleOutput:
		feedbackOutput = constants.vpnRestartPassed

	return feedbackOutput


# ADVANCED UTILITIES

def getLog(directory):
	"""
	Fetches the file path of a text logfile on the file system.

	Args:
		directory (str): The directory to get the logfile from. Format::

			/data0/ + directory

	Returns:
		foundFile (str): The file path of the found logfile.
	"""
	filenames = doConsoleCommand(constants.getLogfileName.format(directory))
	foundfile = filenames.split('\n')[0]

	return foundfile


def populateConfigBox():
	"""
	Serves information to fill in the interface for changing the dfnstation.cfg file.

	Returns:
		outDict (dict): Format::

			{param : value}

	Raises:
		IOError
	"""
	whitelist = constants.configBoxWhitelist
	path = constants.dfnconfigPath
	outDict = {}

	if os.path.exists(path):
		getFile = file(path, 'rb')
		filelines = getFile.read().split("\n")

		for element in whitelist:
			for line in filelines:
				if element + " =" in line:
					parsed = line.split(" = ")
					outDict[parsed[0]] = parsed[1]
	else:
		raise IOError(constants.configNotFound)

	return outDict


def updateConfigFile(inProperty):
	"""
	Updates the dfnstation.cfg file with a new value for a parameter.

	Args:
		inProperty (json): JSON object representing a config. Format::

			{param : value}

	Returns:
		consoleFeedback (str): Resulting console feedback.

	Raises:
		IOError
	"""
	path = "/opt/dfn-software/dfnstation.cfg"
	consoleFeedback = constants.configWriteFailed

	# Only one keyval pair, so get the "last" one
	newLine = inProperty.key + " = " + inProperty.value + "\n"
	currkey = inProperty.key

	if os.path.exists(path):
		# Create temp file
		fh, abs_path = mkstemp()

		with open(abs_path, 'w') as new_file:
			with open(path) as old_file:
				for line in old_file:
					new_file.write(newLine if currkey in line else line)
		close(fh)
		remove(path)
		move(abs_path, path)
		consoleFeedback = constants.configWritePassed.format(inProperty.key, inProperty.value)
	else:
		raise IOError(constants.configNotFound)

	return consoleFeedback


# INTERVAL TEST UTILITIES

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


def intervalTest():
	"""
	Performs an interval control test on the system.

	Returns:
		feedbackOutput (str): Resulting feedback.
		status (bool): Represents if the test passed or failed.

	Raises:
		IOError
	"""
	# Do interval test command
	consoleOutput = doConsoleCommand(constants.intervalTest + constants.getExitStatus)

	if "\n127" in consoleOutput:
		raise IOError(constants.intervalControlTestScriptNotFound)

	# Check /data0/latest_prev for correct number of NEF files
	status = False
	feedbackOutput = constants.intervalTestFailed

	consoleOutput = doConsoleCommand(constants.checkIntervalResults)

	if consoleOutput in ["6", "7", "8"]:  # NOTE: 7 +/- 1 is the required margin of error.
		status = True
		feedbackOutput = constants.intervalTestPassed

	return feedbackOutput, status


def prevIntervalTest():
	"""
	Checks the /latest folder to see if the camera took pictures the last time the interval control ran.

	Returns:
		consoleFeedback (str): Resulting console feedback.
	"""
	# Get current date
	currDate = datetime.datetime.now()
	consoleFeedback = constants.prevIntervalNotRun

	# Do console command to find mod date of latest
	latestDateUnparsed = doConsoleCommand(constants.checkPrevIntervalStatus)
	latestDateParsed = re.search('\d{4}-\d{2}-\d{2}', latestDateUnparsed).group(0)
	latestDateSplit = re.split("-", latestDateParsed)

	if currDate.day == int(latestDateSplit[2]) and currDate.month == int(latestDateSplit[1]) and currDate.year == int(
			latestDateSplit[0]):
		consoleFeedback = constants.prevIntervalDidRun

	return consoleFeedback
