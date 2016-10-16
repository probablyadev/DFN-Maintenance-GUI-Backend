# Placeholder for now, this is where we send data to die.
import constants
import commands

def doCommand(commandID):
    command = ""
    if commandID == "thing":
        command = constants.thing
    elif commandID == "coolthing":
        command = constants.coolthing
    else:
        return "ERROR: No command for this button exists."
    return commands.getstatusoutput(command)[1]

