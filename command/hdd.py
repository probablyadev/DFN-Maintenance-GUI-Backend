# EXTERNAL HARD DRIVE UTILITIES
import inspect
import re

from backend.constants import getHostname

import time
from command import exec_console_command


def check_hdd():
    """
    Delivers a summary of the external hard drive's status.

    Returns:
        feedbackOutput (str): Resulting feedback.
        HDD(0 - 3)Status (int): Represents the status of each external hard drive.
        HDD(0 - 3)Space (float): Represents the occupied space of each external hard drive.

    Raises:
        IOError

    TODO: For the love of god fix this.
    """
    hddStatusDict = {0: constants.hddStatusOff, 1: constants.hddStatusPowered, 2: constants.hddStatusMounted}

    # Do command
    command = constants.mountedStatus
    data1MountedStatus = exec_console_command(command.format("/data1"))
    data2MountedStatus = exec_console_command(command.format("/data2"))
    data3MountedStatus = exec_console_command(command.format("/data3"))

    # Parse output for results
    # NB: Status 0 = Unpowered, Status 1 = Powered, but not mounted, Status 2 = Powered + Mounted
    hdd0Status = 0
    hdd1Status = 0
    hdd2Status = 0
    hdd3Status = 0
    hdd0Space = "N/A"
    hdd1Space = "N/A"
    hdd2Space = "N/A"
    hdd3Space = "N/A"

    if "SUCCESS" in exec_console_command(constants.data0PoweredStatus):
        hdd0Status = 2

    # Check if HDDs are powered. Depends on system architecture
    # DFNSMALLs
    if "EXT" not in getHostname():
        poweredStatus = exec_console_command(constants.hddPoweredStatus)

        if "JMicron Technology Corp." in poweredStatus:
            hdd1Status = 1
            hdd2Status = 1
            hdd3Status = 0

            if data1MountedStatus == "1":
                hdd1Status = 2

            if data2MountedStatus == "1":
                hdd2Status = 2

            if data3MountedStatus == "1":
                hdd3Status = 2
                # DFNEXTs
    else:
        poweredStatus = exec_console_command(constants.hddPoweredStatusExt)

        if "sdb1" in poweredStatus:
            hdd1Status = 1

            if data1MountedStatus == "1":
                hdd1Status = 2

        if "sdc1" in poweredStatus:
            hdd2Status = 1

            if data2MountedStatus == "1":
                hdd2Status = 2

        if "sdd1" in poweredStatus:
            hdd3Status = 1

            if data3MountedStatus == "1":
                hdd3Status = 2

    # Finding remaining space in HDDs
    # If mounted, use df
    if hdd1Status == 2 and hdd2Status == 2:
        outText = exec_console_command(constants.hddSpaceLive)

        if outText:
            lines = outText.split('\n')
    # If not mounted, use disk usage file
    else:
        try:
            with open(constants.diskUsagePath) as f:
                lines = f.readlines()
        except IOError:
            stack = inspect.stack()
            frame = stack[1][0]

            if hasattr(frame.f_locals, "self"):
                raise IOError(constants.diskUsageNotFound)
            else:
                feedback_output = constants.hddStatusString.format(hddStatusDict[hdd0Status], hdd0Space,
                                                                   hddStatusDict[hdd1Status], hdd1Space,
                                                                   hddStatusDict[hdd2Status], hdd2Space,
                                                                   hddStatusDict[hdd3Status],
                                                                   hdd3Space) + constants.diskUsageNotFound + '\n'

                return feedback_output, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space

    for line in lines:  # For each line in the file
        fixedLine = re.sub(" +", ",", line)  # Reduce whitespace down to 1

        if line[0] == "/":  # If the line is the title line, ignore it
            splitLine = re.split(",", fixedLine)  # Split into terms
            device = splitLine[5]  # Get mounted name
            spaceAvail = splitLine[4]  # Get space for that mount

            # Check if the data applies, if so assign to variable
            if "/data0" in device:
                hdd0Space = spaceAvail
            if "/data1" in device:
                hdd1Space = spaceAvail
            if "/data2" in device:
                hdd2Space = spaceAvail
            if "/data3" in device:
                hdd3Space = spaceAvail

    feedback_output = constants.hddStatusString.format(hddStatusDict[hdd0Status], hdd0Space, hddStatusDict[hdd1Status],
                                                       hdd1Space, hddStatusDict[hdd2Status], hdd2Space,
                                                       hddStatusDict[hdd3Status], hdd3Space)

    hdd_status = []
    hdd_status = (
        {
            "name":   "HDD 0",
            "status": hdd0Status,
            "space":  hdd0Space
        },
        {
            "name":   "HDD 1",
            "status": hdd1Status,
            "space":  hdd1Space
        },
        {
            "name":   "HDD 2",
            "status": hdd2Status,
            "space":  hdd2Space
        },
        {
            "name":   "HDD 3",
            "status": hdd3Status,
            "space":  hdd3Space
        }
    )

    return feedback_output, hdd_status


def disable_hdd():
    """
    Switches the camera's external hard drives off.

    Returns:
        feedbackOutput (str): Resulting feedback.

    Raises:
        RuntimeError, IOError
    """
    devices = ["sdb", "sdc", "sdd"]  # Used for deleting devices in EXTs before powering off

    # If hardrives already off or mounted, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = check_hdd()

    if hdd1Status != 1 and hdd2Status != 1:
        return constants.hddNotOnPoweredState

    # For EXT, delete the devices ONLY if they're all not solid state devices.
    if "EXT" in getHostname():
        for device in devices:
            # Check if the device is a solid state or HDD
            driveRotation = exec_console_command(constants.extDeleteDriveDevicesCheck.format(device))

            if not re.search("[0-9]", driveRotation):
                raise RuntimeError(
                    "External drives are not on correct device label. Use the command line to resolve this.")

                # No exceptions have been raised by this point, so delete drives
        for device in devices:
            exec_console_command(constants.extDeleteDriveDevice.format(device))

        time.sleep(1)
    # Then proceed to power off as normal

    # Do command
    consoleOutput = exec_console_command(constants.disableHardDrive + constants.getExitStatus)

    if "\n2" in consoleOutput:
        raise IOError(constants.hddOffScriptNotFound)

    if consoleOutput == "0":
        feedbackOutput = constants.hddCommandedOff
    else:
        feedbackOutput = constants.hddOffFailed

    # Sleep if EXT, needs time to remove drives.
    if "EXT" in getHostname():
        time.sleep(22)

    return feedbackOutput


def enable_hdd():
    """
    Switches the camera's external hard drives on.

    Returns:
        constants.hddCommandedOn (str): Represents the success of the operation.

    Raises:
        IOError
    """
    # If hardrives already on, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = check_hdd()

    if hdd1Status != 0 and hdd2Status != 0:
        return constants.hddAlreadyOn

    # Do command
    consoleOutput = exec_console_command(constants.enableHardDrive + constants.getExitStatus)

    if "\n2" in consoleOutput:
        raise IOError(constants.scriptNotFound)

    time.sleep(25)

    # For EXT, re-scan SATA/SCSI hotswap drives
    if "EXT" in getHostname():
        exec_console_command(constants.scanSATA)
        time.sleep(2)

    return constants.hddCommandedOn


def format_hdd(inDrives):
    """
    Formats the specified drives.

    Args:
        inDrives (str): A string of arguments for the format hard drive script.

    Returns:
        feedbackOutput (str): Resulting feedback.

    Raises:
        IOError, RuntimeError
    """
    consoleOutput = exec_console_command(constants.formatHardDrive.format(inDrives) + constants.getExitStatus)

    if "\n127" in consoleOutput:
        consoleOutput = exec_console_command(constants.formatHardDriveOLD(inDrives) + constants.getExitStatus)

        if "\n127" in consoleOutput:
            raise IOError(constants.hddFormatScriptNotFound)
        elif "is mounted" in consoleOutput:
            raise RuntimeError(constants.hddFormatFailed)
        else:
            feedbackOutput = constants.hddFormatPassed
    elif "is mounted" in consoleOutput:
        raise RuntimeError(constants.hddFormatFailed)
    else:
        feedbackOutput = constants.hddFormatPassed

    return feedbackOutput


def mount_hdd():
    """
    Mounts the external hard drive's to the file system.

    Returns:
        feedbackOutput (str): Resulting feedback.
    """
    outputDict = {'/data1': "Drive #1", '/data2': "Drive #2", '/data3': "Drive #3"}
    smalldrives = ['/data1', '/data2']
    extdrives = ['/data1', '/data2', '/data3']
    drives = ['']
    feedbackOutput = ""

    hostname = getHostname()

    if 'EXT' in hostname:
        drives = list(extdrives)
    else:
        drives = list(smalldrives)

    temp, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = check_hdd()
    poweredArray = [hdd1Status, hdd2Status, hdd3Status]

    for idx, drive in enumerate(drives):
        # Do command for drive
        consoleOutput = exec_console_command(constants.mountHardDrive.format(drive))

        if "SUCCESS" in consoleOutput:
            if poweredArray[idx] == 0:
                feedbackOutput += constants.hddMountFailed.format(outputDict[drive], constants.hddNotPoweredError)
            else:
                feedbackOutput += constants.hddMountPassed.format(outputDict[drive])
        else:
            feedbackOutput += constants.hddMountFailed.format(outputDict[drive], constants.hddAlreadyMountedError)

    return feedbackOutput


def move_data_0():
    """
    Moves /data0 data to the external drive's.

    Returns:
        consoleFeedback (str): Resulting console feedback.

    Raises:
        IOError
    """
    command = constants.moveData0

    if "EXT" in getHostname():
        command = constants.moveData0Ext

    consoleOutput = exec_console_command(command)

    if "SUCCESS" in consoleOutput:
        consoleFeedback = "Move command successful."
    else:
        raise IOError("Move command unsuccessful.")

    return consoleFeedback


def probe_hdd():
    """
    Searches for present hard drive's to format.

    Returns:
        data (dict): Format::

            {/dev/sdxx : /datax/dev/sdxx}

    Raises:
        IOError
    """
    # Do command
    consoleOutput = exec_console_command(constants.probeHardDrives)
    data = {}

    # Parse results
    if "no such file or directory" in consoleOutput:
        consoleOutput = exec_console_command(constants.probeHardDrivesOLD)

        if "no such file or directory" in consoleOutput:
            raise IOError(constants.hddFormatScriptNotFound)

    firstLine = consoleOutput.split("\n")
    consoleOutput = firstLine[0]
    splitOutput = consoleOutput.split(" ")

    for idx, token in enumerate(splitOutput):
        if "/" in token:
            data[splitOutput[idx + 1]] = token + " " + splitOutput[idx + 1]

    return data


def smart_test():
    """
    Performs a smart test.

    Returns:
        feedbackOutput (str): Resulting feedback.

    Raises:
        AssertionError
        OSError
    """
    smalldrives = ["usbjmicron,00", "usbjmicron,01"]
    successfuldrives = list(smalldrives)
    output = {}
    feedbackOutput = ""

    # If hardrives off or not mounted, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = check_hdd()

    try:
        assert hdd1Status == 0 and hdd2Status == 0
    except AssertionError:
        raise AssertionError(constants.smartTestNotPowereredError)

    # Start all smart tests
    for drive in smalldrives:
        consoleOutput = exec_console_command(constants.runSmartTest.format(drive) + constants.getExitStatus)

        if "\n127" in consoleOutput:
            raise OSError(constants.smartTestCommandNotInstalled)

        elif "\n0" in consoleOutput:
            output.update({drive: constants.smartTestStartedSuccess.format(drive)})

        else:
            output.update({drive: constants.smartTestStartedFailed.format(drive)})
            successfuldrives.remove(drive)

    # Wait for completion
    if successfuldrives:
        # Sleep while smart test performs
        time.sleep(70)

        # Evaluate results
        for drive in successfuldrives:
            consoleOutput = exec_console_command(constants.checkSmartTest.format(drive))

            if "No Errors Logged" in consoleOutput:
                output[drive] += constants.smartTestResultsPassed.format(drive)
            else:
                output[drive] += constants.smartTestResultsFailed.format(drive)

    for drive in smalldrives:
        feedbackOutput += output[drive]

    return feedbackOutput


def unmount_hdd():
    """
    Unmounts the external hard drive's from the file system.

    Returns:
        feedbackOutput (str): Resulting feedback.
    """
    outputDict = {'/data1': "Drive #1", '/data2': "Drive #2", '/data3': "Drive #3", }
    smalldrives = ['/data1', '/data2']
    extdrives = ['/data1', '/data2', '/data3']
    drives = ['']
    feedbackOutput = ""

    hostname = getHostname()

    if 'EXT' in hostname:
        drives = list(extdrives)
    else:
        drives = list(smalldrives)

    for drive in drives:
        # Do command
        consoleOutput = exec_console_command(constants.unmountHardDrive.format(drive))

        # Parse results
        if "SUCCESS" in consoleOutput:
            feedbackOutput += constants.hddUnmountPassed.format(outputDict[drive])
        else:
            feedbackOutput += constants.hddUnmountFailed.format(outputDict[drive], constants.hddAlreadyUnmountedError)

    return feedbackOutput
