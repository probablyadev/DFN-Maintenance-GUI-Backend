# Placeholder for now, this is where we send data to die.
import constants
import commands
import random

def doConsoleCommand(command):
    outputText = "Command done: " + command + "\n" + commands.getstatusoutput(command)[1] + "\n"
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

def gpsCheck():
    # Do command
    consoleOutput = doConsoleCommand(constants.gpsCheck)

    # Parse output for results
    status = bool(random.getrandbits(1))

    return consoleOutput, status

def internetCheck():
    # Do command
    consoleOutput = doConsoleCommand(constants.internetCheck)

    # Parse output for results
    status = bool(random.getrandbits(1))

    return consoleOutput, status
