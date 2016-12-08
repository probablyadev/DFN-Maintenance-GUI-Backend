# Placeholder for now, this is where we send data to die.
import constants
import commands
import random
import re

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

# HDD Utilities
def hddOn():
    # Do command
    # consoleOutput = doConsoleCommand(constants.enableHardDrive)
    consoleOutput = "HDD ON PYTHON COMMAND OUTPUT HERE\n"

    #TODO: Parse output for results

    return consoleOutput

def hddOff():
    # Do command
    # consoleOutput = doConsoleCommand(constants.disableHardDrive)
    consoleOutput = "HDD OFF PYTHON COMMAND OUTPUT HERE\n"

    # TODO: Parse output for results

    return consoleOutput

def unmountHDD():
    # Do command
    # consoleOutput = doConsoleCommand(constants.unmountHardDrive)
    consoleOutput = "HDD UNMOUNT PYTHON COMMAND OUTPUT HERE\n"

    # TODO: Parse output for results

    return consoleOutput


def hddStatus():
    hddStatusDict = {0: constants.hddStatusOff, 1: constants.hddStatusPowered, 2: constants.hddStatusMounted}

    # Do command
    poweredStatus = doConsoleCommand(constants.hddPoweredStatus)
    data1MountedStatus = doConsoleCommand(constants.data1MountedStatus)
    data2MountedStatus = doConsoleCommand(constants.data2MountedStatus)
    print data1MountedStatus
    print data2MountedStatus

    # Parse output for results
    # NB: Status 0 = Unpowered, Status 1 = Powered, but not mounted, Status 2 = Powered + Mounted
    hdd1Status = 0
    hdd2Status = 0
    hdd1Space = "0"
    hdd2Space = "0"

    if "JMicron Technology Corp." in poweredStatus:
        hdd1Status = 1
        hdd2Status = 1

        if data1MountedStatus == "1":
            hdd1Status = 2
        if data2MountedStatus == "1":
            hdd2Status = 2

    feedbackOutput = constants.hddStatusString.format(hddStatusDict[hdd1Status], hdd1Space, hddStatusDict[hdd2Status], hdd2Space)

    return feedbackOutput, hdd1Status, hdd2Status, hdd1Space, hdd2Space

def data0Check():
    # Do command
    # consoleOutput = doConsoleCommand(constants.hddStatus)
    consoleOutput = "\nDATA0 CHECK OUTPUT HERE\n"

    #TODO: Parse output for results
    data0Status = bool(random.getrandbits(1))

    return consoleOutput, data0Status


# GPS Utilities
def gpsStatus():
    gpsStatusDict = {"1": "Locked", "0": "No lock"}

    # Do command
    consoleOutput = doConsoleCommand(constants.gpsCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.gpsCheckFailed

    splitOutput = re.split(',|\n', consoleOutput)
    if len(splitOutput) == 15:
        if splitOutput[6] == 1:
            status = True
        feedbackOutput = constants.gpsOnline.format(gpsStatusDict[splitOutput[6]], splitOutput[7])

    return feedbackOutput, status

# Internet Utilities
def internetStatus():
    #Do command
    consoleOutput = doConsoleCommand(constants.internetCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.internetCheckFailed

    if "0" not in re.split(",", consoleOutput)[1]:
        status = True
        feedbackOutput = constants.internetCheckPassed

    return feedbackOutput, status

def vpnStatus():
    #Do command
    consoleOutput = doConsoleCommand(constants.vpnCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.vpnCheckFailed

    if "0" not in re.split(",", consoleOutput)[1]:
        status = True
        feedbackOutput = constants.vpnCheckPassed

    return feedbackOutput, status

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