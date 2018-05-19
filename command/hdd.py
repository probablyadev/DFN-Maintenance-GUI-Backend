# EXTERNAL HARD DRIVE UTILITIES
import inspect
import re
import time
import misc

from backend import constants
from command import exec_console_command
from command.command_exception import CommandError


# TODO: Drive variations will need an abstract class, each extension will contain the different commands for said machine.
# Could also extend this to be for the whole system. I.e. Abstract class for commands that are the same, extension classes for each machines commands that change.

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
    TODO: https://stackoverflow.com/questions/12027237/selecting-specific-columns-from-df-h-output-in-python
    """
    command = "mount | grep {0} > /dev/null"
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

    # TODO[ash]: Check that this actually works to check success
    if exec_console_command("df | grep /data0"):
        hdd0Status = 2

    # Check if HDDs are powered. Depends on system architecture
    # DFNSMALLs
    if "EXT" not in misc.get_hostname():
        poweredStatus = exec_console_command("lsusb")

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
        poweredStatus = exec_console_command("lsblk | grep 'sdb1\|sdc1\|sdd1'")

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
        outText = exec_console_command("df -h | egrep 'Filesystem|data'")

        if outText:
            lines = outText.split('\n')
    # If not mounted, use disk usage file
    else:
        try:
            with open("/tmp/dfn_disk_usage") as f:
                lines = f.readlines()
        except IOError:
            stack = inspect.stack()
            frame = stack[1][0]

            if hasattr(frame.f_locals, "self"):
                raise IOError("Error reading disk usage log file. To see disk space, please power and mount external drives.")

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

    hdd_status = []

    hdd_status["HDD 0"] = {
        "status": hdd0Status,
        "space": hdd0Space
    }

    hdd_status["HDD 1"] = {
        "status": hdd1Status,
        "space": hdd1Space
    }

    hdd_status["HDD 2"] = {
        "status": hdd2Status,
        "space": hdd2Space
    }

    hdd_status["HDD 3"] = {
        "status": hdd3Status,
        "space": hdd3Space
    }

    return hdd_status


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
    hdd_status = check_hdd()

    if hdd_status["HDD 1"]["status"] != 1 and hdd_status["HDD 2"]["status"] != 1:
        return "Hard drives already off, or mounted. Drives must be in a 'powered' state to turn off safely.\n"

    # For EXT, delete the devices ONLY if they're all not solid state devices.
    if "EXT" in misc.get_hostname():
        for device in devices:
            # Check if the device is a solid state or HDD
            driveRotation = exec_console_command("smartctl -i /dev/{0} | grep 'Rotation Rate:'".format(device))

            if not re.search("[0-9]", driveRotation):
                raise RuntimeError(
                    "External drives are not on correct device label. Use the command line to resolve this.")

                # No exceptions have been raised by this point, so delete drives
        for device in devices:
            exec_console_command("echo 1 > /sys/block/{0}/device/delete".format(device))

        time.sleep(1)
    # Then proceed to power off as normal

    # Do command
    import disable_ext-hd

    # Sleep if EXT, needs time to remove drives.
    if "EXT" in misc.get_hostname():
        time.sleep(22)


def enable_hdd():
    """
    Switches the camera's external hard drives on.

    Returns:
        constants.hddCommandedOn (str): Represents the success of the operation.

    Raises:
        IOError
    """
    # If hardrives already on, get outta here!
    hdd_status = check_hdd()

    if hdd_status["HDD 1"]["status"] != 0 and hdd_status["HDD 2"]["status"] != 0:
        return "Hard drives already powered.\n"

    # Do command
    import enable_ext-hd

    time.sleep(25)

    # For EXT, re-scan SATA/SCSI hotswap drives
    if "EXT" in misc.get_hostname():
        exec_console_command("for i in $(find /sys/class/scsi_host/ -name host* ); do echo '- - -' > $i/scan")
        time.sleep(2)

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
        try:
            consoleOutput = exec_console_command(constants.mountHardDrive.format(drive))

            if poweredArray[idx] == 0:
                feedbackOutput += constants.hddMountFailed.format(outputDict[drive], constants.hddNotPoweredError)
            else:
                feedbackOutput += constants.hddMountPassed.format(outputDict[drive])

        except CommandError as error:
            feedbackOutput += constants.hddMountFailed.format(outputDict[drive], constants.hddAlreadyMountedError)


        # TODO[ash]: Return status output as key value pair for each harddrive. E.g. { "HDD 1": success/error output, "HDD 2": ... }


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
