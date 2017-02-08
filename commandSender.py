# Placeholder for now, this is where we send data to die.
import constants
import commands
import re
import time
import datetime
import calendar
import os
import json
from tempfile import mkstemp
from shutil import move
from os import remove, close

# Code for executing a command line command
def doConsoleCommand(command):
    outputText = commands.getstatusoutput(command)[1]
    return outputText

# NB: Most functionality that requires a true/false return, the default is set to false
# and then changed if the exit status for that operation is true.

# Login utilities
def getHostname():
    consoleOutput = doConsoleCommand("hostname")
    return consoleOutput

# Camera utilities
def cameraOn():
    # Do command
    doConsoleCommand(constants.cameraOn)

    # Parse output
    feedbackOutput = constants.cameraSwitchedOn

    return feedbackOutput

def cameraOff():
    # Do command
    doConsoleCommand(constants.cameraOff)

    # Parse output
    feedbackOutput = constants.cameraSwitchedOff

    return feedbackOutput

def videoCameraOn():
    feedbackOutput = constants.videoCameraOperationFailed

    # Do command
    consoleFeedback = doConsoleCommand(constants.videoCameraOn)

    # Parse output
    if "SUCCESS" in consoleFeedback:
        feedbackOutput = constants.videoCameraSwitchedOn

    return feedbackOutput

def videoCameraOff():
    feedbackOutput = constants.videoCameraOperationFailed

    # Do command
    consoleFeedback = doConsoleCommand(constants.videoCameraOff)

    # Parse output
    if "SUCCESS" in consoleFeedback:
        feedbackOutput = constants.videoCameraSwitchedOff

    return feedbackOutput

def cameraStatus():
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
                    #Get filepath for NEF file
                    filePath = (directory + "/" + fileName)
                    #Get corrected timestamp for NEF file
                    fileModTime = os.path.getmtime(filePath)
                    t = time.localtime()
                    offset = calendar.timegm(t) - calendar.timegm(time.gmtime(time.mktime(t)))
                    fileModTime = fileModTime + offset
                    correctedTimeStamp = datetime.datetime.fromtimestamp(fileModTime).strftime("%H:%M:%S")
                    data[correctedTimeStamp] = filePath

        return json.dumps(data, sort_keys=True)

def downloadPicture(inPath):
    success = False
    consoleFeedback = doConsoleCommand(constants.copyFileToStatic.format(inPath.filepath))
    print consoleFeedback
    if "SUCCESS" in consoleFeedback:
        success = True
    return success

def downloadThumbnail(inPath):
    success = False
    consoleFeedback = doConsoleCommand(constants.extractThumbnail.format(inPath.filepath))
    if "SUCCESS" in consoleFeedback:
        success = True
    return success

def removeThumbnail(inJSON):
    time.sleep(2)
    doConsoleCommand("rm " + inJSON.filepath)
    print "rm " + inJSON.filepath

# HDD Utilities
def hddOn():
    # If hardrives already on, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()
    if hdd1Status != 0 and hdd2Status != 0:
        return constants.hddAlreadyOn

    # Do command
    doConsoleCommand(constants.enableHardDrive)
    time.sleep(25)
    return constants.hddCommandedOn

def hddOff():
    # If hardrives already on, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()
    if hdd1Status == 0 and hdd2Status == 0:
        return constants.hddAlreadyOff

    # Do command
    consoleOutput = doConsoleCommand(constants.disableHardDrive)

    if consoleOutput == "":
        feedbackOutput = constants.hddCommandedOff
    else:
        feedbackOutput = constants.hddOffFailed

    return feedbackOutput

def mountHDD():
    outputDict = {'/data1':"Drive #1", '/data2':"Drive #2", '/data3':"Drive #3",}
    smalldrives = ['/data1', '/data2']
    extdrives = ['/data1', '/data2', '/data3']
    feedbackOutput = ""

    poweredStatus = doConsoleCommand(constants.hddPoweredStatus)

    for drive in smalldrives:
        # Do command for drive
        consoleOutput = doConsoleCommand(constants.mountHardDrive.format(drive))


        if "SUCCESS" in consoleOutput:
            if "JMicron Technology Corp." not in poweredStatus:
                feedbackOutput += constants.hddMountFailed.format(outputDict[drive], constants.hddNotPoweredError)
            else:
                feedbackOutput += constants.hddMountPassed.format(outputDict[drive])
        else:
            feedbackOutput += constants.hddMountFailed.format(outputDict[drive], constants.hddAlreadyMountedError)


    return feedbackOutput

def unmountHDD():
    outputDict = {'/data1':"Drive #1", '/data2':"Drive #2", '/data3':"Drive #3",}
    smalldrives = ['/data1', '/data2']
    extdrives = ['/data1', '/data2', '/data3']
    feedbackOutput = ""

    for drive in smalldrives:
        # Do command
        consoleOutput = doConsoleCommand(constants.unmountHardDrive.format(drive))

        # Parse results
        if "SUCCESS" in consoleOutput:
            feedbackOutput += constants.hddUnmountPassed.format(outputDict[drive])
        else:
            feedbackOutput += constants.hddUnmountFailed.format(outputDict[drive], constants.hddAlreadyUnmountedError)

    return feedbackOutput

def probeHDD():
    # Do command
    consoleOutput = doConsoleCommand(constants.probeHardDrives)
    validTokens = []
    data = {}

    # Parse results
    splitOutput = consoleOutput.split(" ")
    for idx, token in enumerate(splitOutput):
        if "/" in token:
            data[splitOutput[idx + 1]] = token + " " + splitOutput[idx + 1]

    return data

def formatHDD(inDrives):
    consoleOutput = doConsoleCommand(constants.formatHardDrive.format(inDrives))
    feedbackOutput = constants.hddFormatFailed
    if "SUCCESS" in consoleOutput and "is mounted" not in consoleOutput:
        feedbackOutput = constants.hddFormatPassed
    else:
        feedbackOutput = constants.hddFormatFailed


    return feedbackOutput

def hddStatus():
    hddStatusDict = {0: constants.hddStatusOff, 1: constants.hddStatusPowered, 2: constants.hddStatusMounted}

    # Do command
    command = constants.mountedStatus
    poweredStatus = doConsoleCommand(constants.hddPoweredStatus)
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

    #TODO: Account for new architecture
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

    # Finding remaining space in HDDs according to /tmp/dfn_disk_usage
    with open("/tmp/dfn_disk_usage") as f:
        lines = f.readlines()
        for line in lines: # For each line in the file
            fixedLine = re.sub(" +", ",", line) # Reduce whitespace down to 1
            if line[0] == "/": # If the line is the title line, ignore it
                splitLine = re.split(",", fixedLine) # Split into terms
                device = splitLine[5] # Get mounted name
                spaceAvail = splitLine[4] # Get space for that mount
                # Check if the data applies, if so assign to variable
                if device == "/data0\n":
                    hdd0Space = spaceAvail
                if device == "/data1\n":
                    hdd1Space = spaceAvail
                if device == "/data2\n":
                    hdd2Space = spaceAvail
                if device == "/data3\n":
                    hdd3Space = spaceAvail

    feedbackOutput = constants.hddStatusString.format(hddStatusDict[hdd0Status], hdd0Space, hddStatusDict[hdd1Status], hdd1Space, hddStatusDict[hdd2Status], hdd2Space, hddStatusDict[hdd3Status], hdd3Space)

    return feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space

def smartTest():
    smalldrives = ["usbjmicron,00", "usbjmicron,01"]
    successfuldrives = list(smalldrives)
    output = {}
    feedbackOutput = ""

    # If hardrives off or not mounted, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()
    if hdd1Status == 0 and hdd2Status == 0:
        return "\nERROR: Smart test failed. Hard drives need to be powered.\n"

    # Start all smart tests
    for drive in smalldrives:
        consoleOutput = doConsoleCommand(constants.runSmartTest.format(drive))
        if "SUCCESS" in consoleOutput:
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

# GPS + Clock Utilities
def gpsStatus():
    gpsStatusDict = {"1": "Locked", "0": "No lock"}

    # Do command
    consoleOutput = doConsoleCommand(constants.gpsCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.gpsCheckFailed

    splitOutput = re.split(',|\n', consoleOutput)
    if len(splitOutput) == 15:
        if splitOutput[6] == "1":
            status = True
        latitude = splitOutput[2].replace(".", "")
        latitude = ("-" if "S" in splitOutput[3] else '') + latitude[:-6] + "." + latitude[-6:]
        longitude = splitOutput[4].replace(".", "")
        longitude = ("-" if "W" in splitOutput[5] else '') + longitude[:-6] + "." + longitude[-6:]
        feedbackOutput = constants.gpsOnline.format(gpsStatusDict[splitOutput[6]], splitOutput[7], latitude, longitude, splitOutput[9])

    return feedbackOutput, status

def timezoneChange(timezone):
    command = constants.setTimezone
    doConsoleCommand(command.format(timezone))
    return constants.timezoneChanged.format(timezone)

def outputTime():
    #Do command
    consoleOutput = doConsoleCommand(constants.outputTime)
    return consoleOutput + "\n"

# Internet Utilities
def internetStatus():
    #Do command
    consoleOutput = doConsoleCommand(constants.internetCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.internetCheckFailed

    if "unknown" not in consoleOutput:
        splitOutput = re.split(",", consoleOutput)
        if "0" not in splitOutput[1]:
            status = True
            ipAddress = doConsoleCommand(constants.getInternetIP)
            feedbackOutput = constants.internetCheckPassed.format(ipAddress)

    return feedbackOutput, status

def restartModem():
    # Do command
    consoleOutput = doConsoleCommand(constants.restartModem)
    # Parse output for results
    feedbackOutput = constants.modemRestartFailed

    if "SUCCESS" in consoleOutput:
        feedbackOutput = constants.modemRestartPassed

    return feedbackOutput

def vpnStatus():
    # Do command
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
    # Do command
    consoleOutput = doConsoleCommand(constants.restartVPN)

    # Parse output for results
    feedbackOutput = constants.vpnRestartFailed

    if "SUCCESS" in consoleOutput:
        feedbackOutput = constants.vpnRestartPassed

    return feedbackOutput

# Advanced Utilities

def getLog(directory):
    filenames = doConsoleCommand(constants.getLogfileName.format(directory))
    foundfile = filenames.split('\n')[0]
    return foundfile

def populateConfigBox():
    whitelist = constants.configBoxWhitelist
    path = "/opt/dfn-software/dfnstation.cfg"
    outDict = {}

    if os.path.exists(path):
        getFile = file(path, 'rb')
        filelines = getFile.read().split("\n")

        for element in whitelist:
            for line in filelines:
                if element in line:
                    parsed = line.split(" = ")
                    outDict[parsed[0]] = parsed[1]

    return outDict

def updateConfigFile(inProperty):
    path = "/opt/dfn-software/dfnstation.cfg"
    consoleFeedback = constants.configWriteFailed

    #Only one keyval pair, so get the "last" one
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

    return consoleFeedback


# Interval test
def intervalTest():
    # Do interval test command
    doConsoleCommand(constants.intervalTest)

    # Check /data0/latest_prev for correct number of NEF files
    status = False
    feedbackOutput = constants.intervalTestFailed

    consoleOutput = doConsoleCommand(constants.checkIntervalResults)
    if consoleOutput in ["6", "7", "8"]: # NOTE: 7 +/- 1 is the required margin of error.
        status = True
        feedbackOutput = constants.intervalTestPassed

    return feedbackOutput, status

def prevIntervalTest():
    # Get current date
    currDate = datetime.datetime.now()

    # Do console command to find mod date of latest
    consoleFeedback = constants.prevIntervalNotRun
    latestDateUnparsed = doConsoleCommand(constants.checkPrevIntervalStatus)
    latestDateParsed = re.search('\d{4}-\d{2}-\d{2}', latestDateUnparsed).group(0)
    latestDateSplit = re.split("-", latestDateParsed)

    if currDate.day == int(latestDateSplit[2]) and currDate.month == int(latestDateSplit[1]) and currDate.year == int(latestDateSplit[0]):
        consoleFeedback = constants.prevIntervalDidRun

    return consoleFeedback