# Placeholder for now, this is where we send data to die.
import constants
import commands
import random
import re
import time
import datetime

# Code for executing a command line command
def doConsoleCommand(command):
    outputText = commands.getstatusoutput(command)[1]
    return outputText

# NB: Most functionality that requires a true/false return, the default is set to false
# and then changed if the exit status for that operation is true.

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
    # Let's do some directory searching!
    day = inDate.day.zfill(2)
    month = inDate.month.zfill(2)
    year = inDate.year
    commandTemplate = constants.findPictures
    command = commandTemplate.format(year, month, day)
    foundDirectories = doConsoleCommand(command)
    directoriesList = foundDirectories.split('\n')
    if directoriesList[0] == "":
        return False, 0, ""
    else:
        # Find file size of said directory
        command = constants.getDirectorySize
        size = doConsoleCommand(command.format(directoriesList[0]))
        return True, size, directoriesList[0]

# HDD Utilities
def hddOn():
    # Do command
    doConsoleCommand(constants.enableHardDrive)
    time.sleep(25)
    return constants.hddCommandedOn

def hddOff():
    # Do command
    doConsoleCommand(constants.disableHardDrive)

    feedbackOutput = constants.hddCommandedOff

    return feedbackOutput

def mountHDD():
    # Do command
    consoleOutput = doConsoleCommand(constants.mountHardDrive)
    poweredStatus = doConsoleCommand(constants.hddPoweredStatus)
    feedbackOutput = ""

    if "SUCCESS\nSUCCESS" in consoleOutput:
        if "JMicron Technology Corp." not in poweredStatus:
            feedbackOutput = constants.hddMountFailed.format(constants.hddNotPoweredError)
        else:
            feedbackOutput = constants.hddMountPassed
    else:
        feedbackOutput = constants.hddMountFailed.format(constants.hddAlreadyMountedError)


    return feedbackOutput

def unmountHDD():
    # Do command
    consoleOutput = doConsoleCommand(constants.unmountHardDrive)
    poweredStatus = doConsoleCommand(constants.hddPoweredStatus)

    feedbackOutput = feedbackOutput = constants.hddUnmountFailed.format(constants.hddAlreadyUnmountedError)

    if "SUCCESS\nSUCCESS" in consoleOutput:
        feedbackOutput = constants.hddUnmountPassed
    return feedbackOutput

# TODO: FINISH THIS!
def formatHDD(checkData):
    checkDictionary = {"true": "y", "false": "N"}
    i=0
    arg = ["N", "N", "N"]

    for checked in checkData:
        arg[i] = checkDictionary[checked]
        i += 1

    consoleOutput = doConsoleCommand(constants.formatHardDrive.format(arg[0], arg[1], arg[2]))
    print consoleOutput
    return "0\n"

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
    hdd1Status = 0
    hdd2Status = 0
    hdd3Status = 0
    hdd1Space = "-"
    hdd2Space = "-"
    hdd3Space = "-"

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
                if device == "/data1\n":
                    hdd1Space = spaceAvail
                if device == "/data2\n":
                    hdd2Space = spaceAvail
                if device == "/data3\n":
                    hdd3Space = spaceAvail

    feedbackOutput = constants.hddStatusString.format(hddStatusDict[hdd1Status], hdd1Space, hddStatusDict[hdd2Status], hdd2Space, hddStatusDict[hdd3Status], hdd3Space)

    return feedbackOutput, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space

def data0Check():
    # Do command
    # consoleOutput = doConsoleCommand(constants.hddStatus)
    consoleOutput = "\nDATA0 CHECK OUTPUT HERE\n"

    #TODO: Parse output for results
    data0Status = bool(random.getrandbits(1))

    return consoleOutput, data0Status


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
        feedbackOutput = constants.gpsOnline.format(gpsStatusDict[splitOutput[6]], splitOutput[7])

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

    print consoleOutput

    if "0" not in re.split(",", consoleOutput)[1]:
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

    time.sleep(4)
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
    time.sleep(25)

    # Parse output for results
    feedbackOutput = constants.vpnRestartFailed

    if "SUCCESS" in consoleOutput:
        feedbackOutput = constants.vpnRestartPassed

    time.sleep(4)
    return feedbackOutput

# Advanced Utilities

def getLog(directory):
    filenames = doConsoleCommand(constants.getLogfileName.format(directory))
    foundfile = filenames.split('\n')[0]
    return foundfile


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