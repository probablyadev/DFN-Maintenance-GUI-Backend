# Placeholder for now, this is where we send data to die.
import constants
import commands
import random
import json

def doConsoleCommand(command):
    outputText = "Command done: " + command + "\n" + commands.getstatusoutput(command)[1] + "\n\n"
    return outputText

def cameraOn():
    #Do command
    consoleOutput = doConsoleCommand(constants.cameraOn)

    #Parse output for results
    status = bool(random.getrandbits(1))

    #Encode to JSON
    data = {}
    data['feedbacktext'] = consoleOutput
    data['status'] = status
    outJSON = json.dumps(data)
    return outJSON

def cameraOff():
    #Do command
    consoleOutput = doConsoleCommand(constants.cameraOff)

    #Parse output for results
    status = bool(random.getrandbits(1))

    #Encode to JSON
    data = {}
    data['feedbacktext'] = consoleOutput
    data['status'] = status
    outJSON = json.dumps(data)
    return outJSON