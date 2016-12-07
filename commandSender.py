# Placeholder for now, this is where we send data to die.
import constants
import commands
import random
import re

# Code for executing a command line command
def doConsoleCommand(command):
    outputText = commands.getstatusoutput(command)[1]
    return outputText

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
    # Do command
    # consoleOutput = doConsoleCommand(constants.hddStatus)
    consoleOutput = "HDD STATUS OUTPUT HERE\n"

    # TODO: Parse output for results
    hdd1Status = bool(random.getrandbits(1))
    hdd2Status = bool(random.getrandbits(1))
    hdd1Space = str(random.randint(0, 100)) + "%"
    hdd2Space = str(random.randint(0, 100)) + "%"

    return consoleOutput, hdd1Status, hdd2Status, hdd1Space, hdd2Space

def data0Check():
    # Do command
    # consoleOutput = doConsoleCommand(constants.hddStatus)
    consoleOutput = "DATA0 CHECK OUTPUT HERE\n"

    #TODO: Parse output for results
    data0Status = bool(random.getrandbits(1))

    return consoleOutput, data0Status


# GPS Utilities
def gpsStatus():
    gpsStatusDict = {"A": "Locked", "V": "No lock"}

    # Do command
    consoleOutput = doConsoleCommand(constants.gpsCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.gpsCheckFailed

    splitOutput = re.split(',|\n', consoleOutput)
    if len(splitOutput) == 27:
        feedbackOutput = constants.gpsOnline.format(gpsStatusDict[splitOutput[2]], splitOutput[19])

    return feedbackOutput, status

# Internet Utilities
def internetStatus():
    # Do command
    # consoleOutput = doConsoleCommand(constants.internetCheck)
    consoleOutput = "INTERNET STATUS OUTPUT HERE\n"

    # TODO: Parse output for results
    status = bool(random.getrandbits(1))

    return consoleOutput, status

# Interval test
def intervalTest():
    # Do command
    doConsoleCommand(constants.intervalTest)

    # Parse output for results
    status = False
    feedbackOutput = constants.intervalTestFailed

    consoleOutput = doConsoleCommand(constants.checkIntervalResults)
    if consoleOutput in ["6", "7", "8"]:
        status = True
        feedbackOutput = constants.intervalTestPassed

    return feedbackOutput, status