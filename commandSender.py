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
    consoleOutput = doConsoleCommand(constants.getHostname)
    return consoleOutput

# Camera utilities
def cameraOn():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraOn + constants.getExitStatus)
    if "2" in consoleOutput:
        raise IOError(constants.scriptNotFound)

    # Parse output
    feedbackOutput = constants.cameraSwitchedOn

    return feedbackOutput

def cameraOff():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraOff + constants.getExitStatus)
    if "2" in consoleOutput:
        raise IOError(constants.scriptNotFound)

    # Parse output
    feedbackOutput = constants.cameraSwitchedOff

    return feedbackOutput

def videoCameraOn():
    # Do command
    consoleFeedback = doConsoleCommand(constants.videoCameraOn + constants.getExitStatus)

    # Parse output
    if "2" in consoleFeedback:
        raise IOError(constants.scriptNotFound)

    feedbackOutput = constants.videoCameraSwitchedOn

    return feedbackOutput

def videoCameraOff():
    # Do command
    consoleFeedback = doConsoleCommand(constants.videoCameraOff + constants.getExitStatus)

    # Parse output
    if "2" in consoleFeedback:
        raise IOError(constants.scriptNotFound)

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
                    # Find timestamp of when photo was taken
                    regexSearch = re.search('(?<!\d)\d{6}(?!\d)', filePath)
                    fileCreationTime = ""
                    if regexSearch:
                        fileCreationTime = regexSearch.group(0)
                        fileCreationTime = fileCreationTime[:2] + ':' + fileCreationTime[2:]
                        fileCreationTime = fileCreationTime[:5] + ':' + fileCreationTime[5:]
                        h, m, s = fileCreationTime.split(':')
                        seconds = int(h) * 3600 + int(m) * 60 + int(s)
                        offset = calendar.timegm(time.localtime()) - calendar.timegm(time.gmtime(time.mktime(time.localtime())))
                        fileCreationTimeSeconds = seconds + offset
                        fileCreationTimeReadable = time.strftime('%H:%M:%S', time.gmtime(fileCreationTimeSeconds))

                    data[fileCreationTimeReadable] = filePath

        return json.dumps(data, sort_keys=True)

def downloadPicture(inPath):
    success = False
    consoleFeedback = doConsoleCommand(constants.copyFileToStatic.format(inPath.filepath))
    print consoleFeedback
    if "SUCCESS" in consoleFeedback:
        success = True
    else:
        raise IOError(constants.pictureNotFound)
    return success

def downloadThumbnail(inPath):
    success = False
    consoleFeedback = doConsoleCommand(constants.extractThumbnail.format(inPath.filepath))
    if "SUCCESS" in consoleFeedback:
        success = True
    else:
        raise IOError(constants.pictureNotFound)
    return success

def removeThumbnail(inJSON):
    time.sleep(2)
    consoleOutput = doConsoleCommand("rm " + inJSON.filepath + ";" + constants.getExitStatus)
    if "\n1" in consoleOutput:
        raise IOError("Thumbnail file doesn't exist to delete. No worries though, it was going to be deleted anyway!")

    return 0

# HDD Utilities
def hddOn():
    # If hardrives already on, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()
    if hdd1Status != 0 and hdd2Status != 0:
        return constants.hddAlreadyOn

    # Do command
    consoleOutput = doConsoleCommand(constants.enableHardDrive + constants.getExitStatus)

    if "\n2" in consoleOutput:
        raise IOError(constants.scriptNotFound)

    time.sleep(25)
    return constants.hddCommandedOn

def hddOff():
    # If hardrives already on, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()
    if hdd1Status == 0 and hdd2Status == 0:
        return constants.hddAlreadyOff

    # Do command
    consoleOutput = doConsoleCommand(constants.disableHardDrive + constants.getExitStatus)

    if "\n2" in consoleOutput:
        raise IOError(constants.scriptNotFound)

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
    consoleOutput = doConsoleCommand(constants.probeHardDrives + constants.getExitStatus)
    validTokens = []
    data = {}

    # Parse results
    if "\n127" in consoleOutput:
        raise IOError(constants.scriptNotFound)

    splitOutput = consoleOutput.split(" ")
    for idx, token in enumerate(splitOutput):
        if "/" in token:
            data[splitOutput[idx + 1]] = token + " " + splitOutput[idx + 1]

    return data

def formatHDD(inDrives):
    consoleOutput = doConsoleCommand(constants.formatHardDrive.format(inDrives) + constants.getExitStatus)


    if "\n127" in consoleOutput:
        raise IOError(constants.scriptNotFound)
    elif "is mounted" in consoleOutput:
        raise RuntimeError(constants.hddFormatFailed)
    else:
        feedbackOutput = constants.hddFormatPassed

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
    try:
        with open(constants.diskUsagePath) as f:
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
    except IOError:
        raise IOError(constants.diskUsageNotFound)

    feedbackOutput = constants.hddStatusString.format(hddStatusDict[hdd0Status], hdd0Space, hddStatusDict[hdd1Status], hdd1Space, hddStatusDict[hdd2Status], hdd2Space, hddStatusDict[hdd3Status], hdd3Space)

    return feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space

def smartTest():
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

# GPS + Clock Utilities
def gpsStatus():
    gpsStatusDict = {"1": "Locked", "0": "No lock"}

    # Do command
    consoleOutput = doConsoleCommand(constants.gpsCheck + constants.getExitStatus)

    if "\n2" in consoleOutput:
        raise IOError(constants.scriptNotFound)

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
    path = constants.dfnconfigPath
    outDict = {}

    if os.path.exists(path):
        getFile = file(path, 'rb')
        filelines = getFile.read().split("\n")

        for element in whitelist:
            for line in filelines:
                if element in line:
                    parsed = line.split(" = ")
                    outDict[parsed[0]] = parsed[1]
    else:
        raise IOError(constants.configNotFound)

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
    else:
        raise IOError(constants.configNotFound)

    return consoleFeedback


# Interval test
def intervalTest():
    # Do interval test command
    consoleOutput = doConsoleCommand(constants.intervalTest + constants.getExitStatus)
    if "\n127" in consoleOutput:
        raise IOError(constants.scriptNotFound)

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
    consoleFeedback = constants.prevIntervalNotRun

    # Do console command to find mod date of latest
    latestDateUnparsed = doConsoleCommand(constants.checkPrevIntervalStatus)
    latestDateParsed = re.search('\d{4}-\d{2}-\d{2}', latestDateUnparsed).group(0)
    latestDateSplit = re.split("-", latestDateParsed)

    if currDate.day == int(latestDateSplit[2]) and currDate.month == int(latestDateSplit[1]) and currDate.year == int(latestDateSplit[0]):
        consoleFeedback = constants.prevIntervalDidRun

    return consoleFeedback