# Placeholder for now, this is where we send data to die.
import constants
import commands
import random
import json

def doConsoleCommand(command):
    outputText = "Command done: " + command + "\n" + commands.getstatusoutput(command)[1] + "\n\n"
    return outputText

def cameraOn():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraOn)

    #TODO: Parse output for results

    # Encode to JSON
    data = {}
    data['feedbackText'] = consoleOutput
    outJSON = json.dumps(data)
    return outJSON

def cameraOff():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraOff)

    # TODO: Parse output for results

    # Encode to JSON
    data = {}
    data['feedbackText'] = consoleOutput
    outJSON = json.dumps(data)
    return outJSON

def cameraStatus():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraCheck)

    # TODO: Parse output for results
    status = bool(random.getrandbits(1))

    # Encode to JSON
    data = {}
    data['feedbackText'] = consoleOutput
    data['status'] = status
    outJSON = json.dumps(data)
    return outJSON

def gpsCheck():
    # Do command
    consoleOutput = doConsoleCommand(constants.gpsCheck)

    # Parse output for results
    status = bool(random.getrandbits(1))

    # Encode to JSON
    data = {}
    data['feedbackText'] = consoleOutput
    data['status'] = status
    outJSON = json.dumps(data)
    return outJSON

def internetCheck():
    # Do command
    consoleOutput = doConsoleCommand(constants.internetCheck)

    # Parse output for results
    status = bool(random.getrandbits(1))

    # Encode to JSON
    data = {}
    data['feedbackText'] = consoleOutput
    data['status'] = status
    outJSON = json.dumps(data)
    return outJSON
