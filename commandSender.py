# Placeholder for now, this is where we send data to die.
import constants
import commands
import random

# Code for executing a command line command
def doConsoleCommand(command):
    outputText = commands.getstatusoutput(command)[1]
    return outputText

# Camera utilities
def cameraOn():
    # Do command
    # consoleOutput = doConsoleCommand(constants.cameraOn)
    consoleOutput = "CAMERA ON PYTHON COMMAND OUTPUT HERE\n"

    #TODO: Parse output and present nicely

    return consoleOutput

def cameraOff():
    # Do command
    # consoleOutput = doConsoleCommand(constants.cameraOff)
    consoleOutput = "CAMERA OFF PYTHON COMMAND OUTPUT HERE\n"

    # TODO: Parse output for results

    return consoleOutput

def cameraStatus():
    # Do command
    # consoleOutput = doConsoleCommand(constants.cameraCheck)
    consoleOutput = "CAMERA STATUS OUTPUT HERE\n"

    # TODO: Parse output for results
    status = bool(random.getrandbits(1))

    # Encode to JSON
    return consoleOutput, status

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

    return consoleOutput, hdd1Status, hdd2Status

def data0Check():
    # Do command
    # consoleOutput = doConsoleCommand(constants.hddStatus)
    consoleOutput = "DATA0 CHECK OUTPUT HERE\n"

    #TODO: Parse output for results
    data0Status = bool(random.getrandbits(1))

    return consoleOutput, data0Status


# GPS Utilities
def gpsStatus():
    # Do command
    # consoleOutput = doConsoleCommand(constants.gpsCheck)
    consoleOutput = "GPS STATUS OUTPUT HERE\n"

    # TODO: Parse output for results
    status = bool(random.getrandbits(1))

    return consoleOutput, status

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
    # consoleOutput = doConsoleCommand(constants.intervalTest)
    consoleOutput = "INTERVAL TEST OUTPUT HERE\n"

    #TODO: Parse output for results
    status = bool(random.getrandbits(1))

    return consoleOutput, status