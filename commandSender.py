# Placeholder for now, this is where we send data to die.
import constants
import commands
import random

def doConsoleCommand(command):
    outputText = commands.getstatusoutput(command)[1] + "\n"
    return outputText

def cameraOn():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraOn)

    #TODO: Parse output and present nicely

    return consoleOutput

def cameraOff():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraOff)

    # TODO: Parse output for results

    return consoleOutput

def cameraStatus():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraCheck)

    # TODO: Parse output for results
    status = bool(random.getrandbits(1))

    # Encode to JSON
    return constants.cameraCheckResult, status

def gpsStatus():
    # Do command
    consoleOutput = doConsoleCommand(constants.gpsCheck)

    # TODO: Parse output for results
    status = bool(random.getrandbits(1))

    return consoleOutput, status

def internetStatus():
    # Do command
    consoleOutput = doConsoleCommand(constants.internetCheck)

    # TODO: Parse output for results
    status = bool(random.getrandbits(1))

    return consoleOutput, status
