# Placeholder for now, this is where we send data to die.
import constants
import subprocess

def doCommand(commandID):
    if commandID == "thing":
        return constants.thing
    elif commandID == "coolthing":
        return constants.coolthing
