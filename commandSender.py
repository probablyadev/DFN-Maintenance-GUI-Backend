"""""
 * * * * * * * * * *
 * Filename:    commandSender.py
 *
 * Purpose:     Responsible for running commands on each Camera, returns appropriate
 *              console output.
 *
 * Copyright:   2017 Fireballs in the Sky, all rights reserved
 *
 * * * * * * * * * *
"""""

# Placeholder for now, this is where we send data to die.
import constants
import commands
import re
import time
import datetime
import calendar
import os
from tempfile import mkstemp
from shutil import move
from os import remove, close

"""""
 * Name:     doConsoleCommand
 *
 * Purpose:  Sends the system a console command to execute in bash
 *
 * Params:   command: A string specifying the console command to be done
 *
 * Return:   A string, the console output
 *
 * Notes:    None
"""""
def doConsoleCommand(command):
    outputText = commands.getstatusoutput(command)[1]
    return outputText

"""""
 * Name:     getHostname
 *
 * Purpose:  Gets the hostname of the system
 *
 * Params:   None
 *
 * Return:   A string, the hostname of the system
 *
 * Notes:    None
"""""
def getHostname():
    consoleOutput = doConsoleCommand(constants.getHostname)
    return consoleOutput

"""""
 * * * * * * * * * * * *
 *   CAMERA UTILITIES  *
 * * * * * * * * * * * *
"""""

"""""
 * Name:     cameraOn
 *
 * Purpose:  Switches the DSLR on
 *
 * Params:   None
 *
 * Return:   feedbackOutput, an output string to give the user feedback
 *
 * Notes:    None
"""""
def cameraOn():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraOn + constants.getExitStatus)
    if "2" in consoleOutput:
        raise IOError(constants.cameraOnScriptNotFound)

    # Parse output
    feedbackOutput = constants.cameraSwitchedOn

    return feedbackOutput

"""""
 * Name:     cameraOff
 *
 * Purpose:  Switches the DSLR off
 *
 * Params:   None
 *
 * Return:   feedbackOutput, an output string to give the user feedback
 *
 * Notes:    None
"""""
def cameraOff():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraOff + constants.getExitStatus)
    if "2" in consoleOutput:
        raise IOError(constants.cameraOffScriptNotFound)

    # Parse output
    feedbackOutput = constants.cameraSwitchedOff

    return feedbackOutput

"""""
 * Name:     videoCameraOn
 *
 * Purpose:  Switches the video camera on
 *
 * Params:   None
 *
 * Return:   consoleFeedback, an output string to give the user feedback
 *
 * Notes:    Doesn't return a boolean yet, because a way to detect the video camera's
 *           presence is still to be implemented.
"""""
def videoCameraOn():
    # Do command
    consoleFeedback = doConsoleCommand(constants.videoCameraOn + constants.getExitStatus)

    # Parse output
    if "2" in consoleFeedback:
        raise IOError(constants.videoCameraOnScriptNotFound)

    feedbackOutput = constants.videoCameraSwitchedOn

    return feedbackOutput

"""""
 * Name:     videoCameraOff
 *
 * Purpose:  Switches the video camera off
 *
 * Params:   None
 *
 * Return:   consoleFeedback, an output string to give the user feedback
 *
 * Notes:    Doesn't return a boolean yet, because a way to detect the video camera's
 *           presence is still to be implemented.
"""""
def videoCameraOff():
    # Do command
    consoleFeedback = doConsoleCommand(constants.videoCameraOff + constants.getExitStatus)

    # Parse output
    if "2" in consoleFeedback:
        raise IOError(constants.cameraOffScriptNotFound)

    feedbackOutput = constants.videoCameraSwitchedOff

    return feedbackOutput

"""""
 * Name:     cameraStatus
 *
 * Purpose:  Delivers a summary of the DSLR's status
 *
 * Params:   None
 *
 * Return:   feedbackOutput: An output string to give the user feedback
 *           status: A boolean representing whether the DSLR is turned on or off
 *
 * Notes:    None
"""""
def cameraStatus():
    # Do command
    consoleOutput = doConsoleCommand(constants.cameraCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.cameraCheckOff

    if "Nikon Corp." in consoleOutput:
        status = True
        feedbackOutput = constants.cameraCheckOn

    # Encode to JSON
    return feedbackOutput, status

"""""
 * Name:     findPictures
 *
 * Purpose:  Fetches the filenames of pictures taken on the date specified
 *
 * Params:   inDate: The date the requested pictures were taken
 *
 * Return:   A python dictionary with many keys, with the following format:
 *           {filecreationtime: filepath}
 *
 * Notes:    None
"""""
def findPictures(inDate):
    data = {}
    # Let's do some directory searching!
    day = inDate.day.zfill(2)
    month = inDate.month.zfill(2)
    year = inDate.year
    commandTemplate = constants.findPictures
    command = commandTemplate.format(year, month, day)
    foundDirectories = doConsoleCommand(command)
    directoriesList = foundDirectories.split('\n')

    if directoriesList:
        # Find all dates + times for all directories
        data = {}
        for directory in directoriesList:
            fileList = doConsoleCommand("ls " + directory).split("\n")
            for fileName in fileList:
                if ".NEF" in fileName:
                    #Get filepath for NEF file
                    filePath = (directory + "/" + fileName)
                    # Find timestamp of when photo was taken
                    regexSearch = re.search('(?<!\d)\d{6}(?!\d)', filePath)
                    fileCreationTime = ""
                    if regexSearch:
                        fileCreationTime = regexSearch.group(0)
                        fileCreationTime = fileCreationTime[:2] + ':' + fileCreationTime[2:]
                        fileCreationTime = fileCreationTime[:5] + ':' + fileCreationTime[5:]
                        h, m, s = fileCreationTime.split(':')
                        seconds = int(h) * 3600 + int(m) * 60 + int(s)
                        offset = calendar.timegm(time.localtime()) - calendar.timegm(time.gmtime(time.mktime(time.localtime())))
                        fileCreationTimeSeconds = seconds + offset
                        fileCreationTimeReadable = time.strftime('%H:%M:%S', time.gmtime(fileCreationTimeSeconds))

                    data[fileCreationTimeReadable] = filePath

        return data

"""""
 * Name:     downloadPicture
 *
 * Purpose:  Fetches the specified .NEF file for the user to download
 *
 * Params:   inPath: The filepath of the file to download
 *
 * Return:   success: A boolean which represents the success of the request
 *
 * Notes:    None
"""""
def downloadPicture(inPath):
    success = False
    consoleFeedback = doConsoleCommand(constants.copyFileToStatic.format(inPath.filepath))
    print consoleFeedback
    if "SUCCESS" in consoleFeedback:
        success = True
    else:
        raise IOError(constants.pictureNotFound)
    return success

"""""
 * Name:     downloadThumbnail
 *
 * Purpose:  Extracts the thumbnail of the specified .NEF, and serves it to the user
 *
 * Params:   inPath: The filepath of the .NEF file to extract the thumbnail from
 *
 * Return:   success: A boolean representing the success of the operation
 *
 * Notes:    None
"""""
def downloadThumbnail(inPath):
    success = False
    consoleFeedback = doConsoleCommand(constants.extractThumbnail.format(inPath.filepath))
    if "SUCCESS" in consoleFeedback:
        success = True
    else:
        raise IOError(constants.pictureNotFound)
    return success

"""""
 * Name:     removeThumbnail
 *
 * Purpose:  Deletes the specified thumbnail from the camera's filesystem
 *
 * Params:   inJSON: A JSON object with the following format:
 *           {filepath: (filepath)}
 *
 * Return:   success: A boolean relating to the success of the operation
 *
 * Notes:    None
"""""
def removeThumbnail(inJSON):
    time.sleep(2)
    consoleOutput = doConsoleCommand("rm " + inJSON.filepath + ";" + constants.getExitStatus)
    if "\n1" in consoleOutput:
        raise IOError("Thumbnail file doesn't exist to delete. No worries though, it was going to be deleted anyway!")

    return 0

"""""
 * * * * * * * * * * * * * * * * *
 * EXTERNAL HARD DRIVE UTILITIES *
 * * * * * * * * * * * * * * * * *
"""""

"""""
 * Name:     hddOn
 *
 * Purpose:  Switches the camera's external hard drives on
 *
 * Params:   None
 *
 * Return:   A string, relating to the success of the operation
 *
 * Notes:    None
"""""
def hddOn():
    # If hardrives already on, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()
    if hdd1Status != 0 and hdd2Status != 0:
        return constants.hddAlreadyOn

    # Do command
    consoleOutput = doConsoleCommand(constants.enableHardDrive + constants.getExitStatus)

    if "\n2" in consoleOutput:
        raise IOError(constants.scriptNotFound)

    time.sleep(25)
    return constants.hddCommandedOn

"""""
 * Name:     hddOff
 *
 * Purpose:  Switches the camera's external hard drives off
 *
 * Params:   None
 *
 * Return:   A string, relating to the success of the operation
 *
 * Notes:    None
"""""
def hddOff():
    # If hardrives already on, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()
    if hdd1Status == 0 and hdd2Status == 0:
        return constants.hddAlreadyOff

    # Do command
    consoleOutput = doConsoleCommand(constants.disableHardDrive + constants.getExitStatus)

    if "\n2" in consoleOutput:
        raise IOError(constants.hddOffScriptNotFound)

    if consoleOutput == "":
        feedbackOutput = constants.hddCommandedOff
    else:
        feedbackOutput = constants.hddOffFailed

    # Sleep if EXT, needs time to remove drives.
    if "EXT" in getHostname():
        time.sleep(22)

    return feedbackOutput

"""""
 * Name:     mountHDD
 *
 * Purpose:  Mounts the external hard drives to the file system
 *
 * Params:   None
 *
 * Return:   A string, relating to the success of the operation
 *
 * Notes:    None
"""""
def mountHDD():
    outputDict = {'/data1':"Drive #1", '/data2':"Drive #2", '/data3':"Drive #3"}
    smalldrives = ['/data1', '/data2']
    extdrives = ['/data1', '/data2', '/data3']
    drives = ['']
    feedbackOutput = ""

    hostname = getHostname()
    if 'EXT' in hostname:
        drives = list(extdrives)
    else:
        drives = list(smalldrives)

    poweredStatus = doConsoleCommand(constants.hddPoweredStatus)

    for drive in drives:
        # Do command for drive
        consoleOutput = doConsoleCommand(constants.mountHardDrive.format(drive))


        if "SUCCESS" in consoleOutput:
            if "JMicron Technology Corp." not in poweredStatus:
                feedbackOutput += constants.hddMountFailed.format(outputDict[drive], constants.hddNotPoweredError)
            else:
                feedbackOutput += constants.hddMountPassed.format(outputDict[drive])
        else:
            feedbackOutput += constants.hddMountFailed.format(outputDict[drive], constants.hddAlreadyMountedError)


    return feedbackOutput

"""""
 * Name:     unmountHDD
 *
 * Purpose:  Unmounts the external hard drives from the file system
 *
 * Params:   None
 *
 * Return:   A string, relating to the success of the operation
 *
 * Notes:    None
"""""
def unmountHDD():
    outputDict = {'/data1':"Drive #1", '/data2':"Drive #2", '/data3':"Drive #3",}
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
        consoleOutput = doConsoleCommand(constants.unmountHardDrive.format(drive))

        # Parse results
        if "SUCCESS" in consoleOutput:
            feedbackOutput += constants.hddUnmountPassed.format(outputDict[drive])
        else:
            feedbackOutput += constants.hddUnmountFailed.format(outputDict[drive], constants.hddAlreadyUnmountedError)

    return feedbackOutput

"""""
 * Name:     probeHDD
 *
 * Purpose:  Searches for present drives to format
 *
 * Params:   None
 *
 * Return:   A python dictionary with many keys, with the following format;
 *           {/dev/sdxx: /datax /dev/sdxx}
 *
 * Notes:    None
"""""
def probeHDD():
    # Do command
    consoleOutput = doConsoleCommand(constants.probeHardDrives + constants.getExitStatus)
    data = {}

    # Parse results
    if "\n127" in consoleOutput:
        raise IOError(constants.hddFormatScriptNotFound)

    splitOutput = consoleOutput.split(" ")
    for idx, token in enumerate(splitOutput):
        if "/" in token:
            data[splitOutput[idx + 1]] = token + " " + splitOutput[idx + 1]

    return data

"""""
 * Name:     FormatHDD.GET
 *
 * Purpose:  Formats specified drives
 *
 * Params:   inDrives, a string of arguments for the format hard drive script
 *
 * Return:   feedbackOutput, an output string to give the user feedback
 *
 * Notes:    None
"""""
def formatHDD(inDrives):
    consoleOutput = doConsoleCommand(constants.formatHardDrive.format(inDrives) + constants.getExitStatus)


    if "\n127" in consoleOutput:
        raise IOError(constants.hddFormatScriptNotFound)
    elif "is mounted" in consoleOutput:
        raise RuntimeError(constants.hddFormatFailed)
    else:
        feedbackOutput = constants.hddFormatPassed

    return feedbackOutput

"""""
 * Name:     hddStatus
 *
 * Purpose:  Delivers a summary of the external hard drives' status
 *
 * Params:   None
 *
 * Return:   feedbackOutput: An output string to give the user feedback
 *           HDD0Status, HDD1Status, HDD2Status, HDD3Status: Integers representing the status
 *               of each external hard drive.
 *           HDD0Space, HDD1Space, HDD2Space, HDD3Space: Real numbers representing the occupied
 *               space of each external hard drive.
 *
 * Notes:    None
"""""
def hddStatus():
    hddStatusDict = {0: constants.hddStatusOff, 1: constants.hddStatusPowered, 2: constants.hddStatusMounted}

    # Do command
    command = constants.mountedStatus
    data1MountedStatus = doConsoleCommand(command.format("/data1"))
    data2MountedStatus = doConsoleCommand(command.format("/data2"))
    data3MountedStatus = doConsoleCommand(command.format("/data3"))

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


    if "SUCCESS" in doConsoleCommand(constants.data0PoweredStatus):
        hdd0Status = 2

    # Check if HDDs are powered. Depends on system architecture
    # DFNSMALLs
    if "EXT" not in getHostname():
        poweredStatus = doConsoleCommand(constants.hddPoweredStatus)
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
    #DFNEXTs
    else:
        poweredStatus = doConsoleCommand(constants.hddPoweredStatusExt)
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
    if hdd1Status == 2 and hdd2Status == 2 and hdd3Status == 2:
        outText = doConsoleCommand(constants.hddSpaceLive)
        if outText:
            lines = outText.split('\n')
    # If not mounted, use disk usage file
    else:
        try:
            with open(constants.diskUsagePath) as f:
                lines = f.readlines()
        except IOError:
            raise IOError(constants.diskUsageNotFound)

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

    feedbackOutput = constants.hddStatusString.format(hddStatusDict[hdd0Status], hdd0Space, hddStatusDict[hdd1Status], hdd1Space, hddStatusDict[hdd2Status], hdd2Space, hddStatusDict[hdd3Status], hdd3Space)

    return feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space

"""""
 * Name:     smartTest
 *
 * Purpose:  Performs a smart test
 *
 * Params:   None
 *
 * Return:   feedbackOutput: An output string to give the user feedback
 *
 * Notes:    None
"""""
def smartTest():
    smalldrives = ["usbjmicron,00", "usbjmicron,01"]
    successfuldrives = list(smalldrives)
    output = {}
    feedbackOutput = ""

    # If hardrives off or not mounted, get outta here!
    feedbackOutput, hdd0Status, hdd0Space, hdd1Status, hdd2Status, hdd3Status, hdd1Space, hdd2Space, hdd3Space = hddStatus()
    try:
        assert hdd1Status == 0 and hdd2Status == 0
    except AssertionError:
        raise AssertionError(constants.smartTestNotPowereredError)

    # Start all smart tests
    for drive in smalldrives:
        consoleOutput = doConsoleCommand(constants.runSmartTest.format(drive) + constants.getExitStatus)
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
            consoleOutput = doConsoleCommand(constants.checkSmartTest.format(drive))
            if "No Errors Logged" in consoleOutput:
                output[drive] += constants.smartTestResultsPassed.format(drive)
            else:
                output[drive] += constants.smartTestResultsFailed.format(drive)

    for drive in smalldrives:
        feedbackOutput += output[drive]

    return feedbackOutput

"""""
 * * * * * * * * * * * * * * * * *
 *         GPS UTILITIES         *
 * * * * * * * * * * * * * * * * *
"""""

"""""
 * Name:     gpsStatus
 *
 * Purpose:  Delivers a summary of the GPS' status
 *
 * Params:   None
 *
 * Return:   feedbackOutput: An output string to give the user feedback
 *           gpstatus: A boolean representing the status of the GPS
 *
 * Notes:    None
"""""
def gpsStatus():
    gpsStatusDict = {"1": "Locked", "0": "No lock"}

    # Do command
    consoleOutput = doConsoleCommand(constants.gpsCheck + constants.getExitStatus)

    if "\n2" in consoleOutput:
        raise IOError(constants.leostickStatusScriptNotFound)

    # Parse output for results
    status = False
    feedbackOutput = constants.gpsCheckFailed

    splitOutput = re.split(',|\n', consoleOutput)
    if len(splitOutput) == 15:
        if splitOutput[6] == "1":
            status = True
        latitude = splitOutput[2].replace(".", "")
        latitude = ("-" if "S" in splitOutput[3] else '') + latitude[:-6] + "." + latitude[-6:]
        longitude = splitOutput[4].replace(".", "")
        longitude = ("-" if "W" in splitOutput[5] else '') + longitude[:-6] + "." + longitude[-6:]
        feedbackOutput = constants.gpsOnline.format(gpsStatusDict[splitOutput[6]], splitOutput[7], latitude, longitude, splitOutput[9])

    return feedbackOutput, status

"""""
 * Name:     timezoneChange
 *
 * Purpose:  Changes the system's timezone
 *
 * Params:   timezone: The timezone information to change the system's timezone to
 *
 * Return:   An output string to give the user feedback
 *
 * Notes:    None
"""""
def timezoneChange(timezone):
    command = constants.setTimezone
    doConsoleCommand(command.format(timezone))
    return constants.timezoneChanged.format(timezone)

"""""
 * Name:     outputTime
 *
 * Purpose:  Outputs the current system time to the user
 *
 * Params:   None
 *
 * Return:   consoleOutput: The console output of the outputTime command
 *
 * Notes:    None
"""""
def outputTime():
    #Do command
    consoleOutput = doConsoleCommand(constants.outputTime)
    return consoleOutput + "\n"

"""""
 * * * * * * * * * * * * * * * * *
 *       NETWORK UTILITIES       *
 * * * * * * * * * * * * * * * * *
"""""

"""""
 * Name:     internetStatus
 *
 * Purpose:  Delivers a summary of the internet connectivity of the system.
 *
 * Params:   None
 *
 * Return:   feedbackOutput: An output string to give the user feedback
 *           internetStatus: A boolean representing the internet connectivity of the system
 *
 * Notes:    None
"""""
def internetStatus():
    #Do command
    consoleOutput = doConsoleCommand(constants.internetCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.internetCheckFailed

    if "unknown" not in consoleOutput and "failure" not in consoleOutput:
        splitOutput = re.split(",", consoleOutput)
        if "0" not in splitOutput[1]:
            status = True
            ipAddress = doConsoleCommand(constants.getInternetIP)
            feedbackOutput = constants.internetCheckPassed.format(ipAddress)

    return feedbackOutput, status

"""""
 * Name:     restartModem
 *
 * Purpose:  Restarts the modem network interface
 *
 * Params:   None
 *
 * Return:   feedbackOutput: An output string to give the user feedback
 *
 * Notes:    None
"""""
def restartModem():
    # Do command
    consoleOutput = doConsoleCommand(constants.restartModem)
    # Parse output for results
    feedbackOutput = constants.modemRestartFailed

    if "SUCCESS" in consoleOutput:
        feedbackOutput = constants.modemRestartPassed

    return feedbackOutput

"""""
 * Name:     vpnStatus
 *
 * Purpose:  Delivers a summary of the vpn connectivity of the system.
 *
 * Params:   None
 *
 * Return:   feedbackOutput: An output string to give the user feedback
 *           vpnStatus: A boolean representing the vpn connectivity of the system
 *
 * Notes:    None
"""""
def vpnStatus():
    # Do command
    consoleOutput = doConsoleCommand(constants.vpnCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.vpnCheckFailed

    if "0" not in re.split(",", consoleOutput)[1]:
        status = True
        ipAddress = doConsoleCommand(constants.getVpnIP)
        feedbackOutput = constants.vpnCheckPassed.format(ipAddress)

    return feedbackOutput, status

"""""
 * Name:     restartVPN
 *
 * Purpose:  Restarts the system's VPN daemon
 *
 * Params:   None
 *
 * Return:   feedbackOutput: An output string to give the user feedback
 *
 * Notes:    None
"""""
def restartVPN():
    # Do command
    consoleOutput = doConsoleCommand(constants.restartVPN)

    # Parse output for results
    feedbackOutput = constants.vpnRestartFailed

    if "SUCCESS" in consoleOutput:
        feedbackOutput = constants.vpnRestartPassed

    return feedbackOutput

"""""
 * * * * * * * * * * * * * * * * *
 *      ADVANCED UTILITIES       *
 * * * * * * * * * * * * * * * * *
"""""

"""""
 * Name:     getLog
 *
 * Purpose:  Fetches the file path of a text logfile on the file system
 *
 * Params:   directory: the directory (/data0/ + directory) to get the logfile from
 *
 * Return:   foundfile: the file path of the found logfile
 *
 * Notes:    None
"""""
def getLog(directory):
    filenames = doConsoleCommand(constants.getLogfileName.format(directory))
    foundfile = filenames.split('\n')[0]
    return foundfile

"""""
 * Name:     populateConfigBox
 *
 * Purpose:  Serves information to fill in the interface for changing the dfnstation.cfg file
 *
 * Params:   None
 *
 * Return:   A python dictionary with many keys the following format:
 *           {param: value}
 *
 * Notes:    None
"""""
def populateConfigBox():
    whitelist = constants.configBoxWhitelist
    path = constants.dfnconfigPath
    outDict = {}

    if os.path.exists(path):
        getFile = file(path, 'rb')
        filelines = getFile.read().split("\n")

        for element in whitelist:
            for line in filelines:
                if element + " =" in line:
                    parsed = line.split(" = ")
                    outDict[parsed[0]] = parsed[1]
    else:
        raise IOError(constants.configNotFound)

    return outDict

"""""
 * Name:     updateConfigFile
 *
 * Purpose:  Updates the dfnstation.cfg file with a new value for a parameter
 *
 * Params:   inProperty, a JSON object in the format:
 *           {param: value}
 *
 * Return:   consoleFeedback: An output string to give the user feedback
 *
 * Notes:    None
"""""
def updateConfigFile(inProperty):
    path = "/opt/dfn-software/dfnstation.cfg"
    consoleFeedback = constants.configWriteFailed

    #Only one keyval pair, so get the "last" one
    newLine = inProperty.key + " = " + inProperty.value + "\n"
    currkey = inProperty.key

    if os.path.exists(path):
        # Create temp file
        fh, abs_path = mkstemp()
        with open(abs_path, 'w') as new_file:
            with open(path) as old_file:
                for line in old_file:
                    new_file.write(newLine if currkey in line else line)
        close(fh)
        remove(path)
        move(abs_path, path)
        consoleFeedback = constants.configWritePassed.format(inProperty.key, inProperty.value)
    else:
        raise IOError(constants.configNotFound)

    return consoleFeedback


"""""
 * * * * * * * * * * * * * * * * *
 *    INTERVAL TEST UTILITIES    *
 * * * * * * * * * * * * * * * * *
"""""

"""""
 * Name:     intervalTest
 *
 * Purpose:  Performs an interval control test on the system
 *
 * Params:   None
 *
 * Return:   feedbackOutput: An output string to give the user feedback
 *           status: A boolean representing if the test passed or failed
 *
 * Notes:    None
"""""
def intervalTest():
    # Do interval test command
    consoleOutput = doConsoleCommand(constants.intervalTest + constants.getExitStatus)
    if "\n127" in consoleOutput:
        raise IOError(constants.intervalControlTestScriptNotFound)

    # Check /data0/latest_prev for correct number of NEF files
    status = False
    feedbackOutput = constants.intervalTestFailed

    consoleOutput = doConsoleCommand(constants.checkIntervalResults)
    if consoleOutput in ["6", "7", "8"]: # NOTE: 7 +/- 1 is the required margin of error.
        status = True
        feedbackOutput = constants.intervalTestPassed

    return feedbackOutput, status

"""""
 * Name:     prevIntervalTest
 *
 * Purpose:  Checks the /latest folder to see if the camera took
 *           pictures the last time interval control ran
 *
 * Params:   None
 *
 * Return:   consoleFeedback: An output string to give the user feedback
 *
 * Notes:    None
"""""
def prevIntervalTest():
    # Get current date
    currDate = datetime.datetime.now()
    consoleFeedback = constants.prevIntervalNotRun

    # Do console command to find mod date of latest
    latestDateUnparsed = doConsoleCommand(constants.checkPrevIntervalStatus)
    latestDateParsed = re.search('\d{4}-\d{2}-\d{2}', latestDateUnparsed).group(0)
    latestDateSplit = re.split("-", latestDateParsed)

    if currDate.day == int(latestDateSplit[2]) and currDate.month == int(latestDateSplit[1]) and currDate.year == int(latestDateSplit[0]):
        consoleFeedback = constants.prevIntervalDidRun

    return consoleFeedback