# Placeholder for now, this is where we send data to die.
import constants
import commands

def doCommand(commandID):
    command = commandFactory(commandID)
    outputText = "Command done: " + command + "\n" + commands.getstatusoutput(command)[1] + "\n\n"
    return outputText

def commandFactory(commandID):
    return {
        "StatusCheck" : constants.statuscheck,
        "GPSCheck" : constants.gpscheck,
        "CameraOn" : constants.cameraon,
        "CameraOff" : constants.cameraoff,
        "HDDOn" : constants.enableharddrive,
        "HDDOff" : constants.disableharddrive,
        "UnmountHDD" : constants.unmountharddrive,
        "CheckSpace" : constants.checkspace
    }.get(commandID, "No command found")
