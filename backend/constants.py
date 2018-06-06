# This file stores all constants used on the server-side of the Desert-Fireball-Maintainence-GUI.
# The major constants here are different bash commands, executed server-side.
getHostname = "hostname"

gpsCheck = "python /opt/dfn-software/leostick_get_status.py -g;"

cameraOn = "python /opt/dfn-software/enable_camera.py;"
cameraOff = "python /opt/dfn-software/disable_camera.py;"
videoCameraOn = "python /opt/dfn-software/enable_video.py"
videoCameraOff = "python /opt/dfn-software/disable_video.py"
cameraCheck = "lsusb"
cameraActuation = "ls /data0/latest/*.NEF | xargs exiv2 | grep 'Shutter Speed'"
getDirectorySize = "du -sh {0} | egrep -o '[0-9]+[A-Z]+'"
getNumFilesInDirectory = 'find {0} -type f | wc -l'
findPictures = "find /data[0-3] -type d -name '*{0}-{1}-{2}*' | grep -v 'test\|video'"
copyFileToStatic = "mkdir /opt/dfn-software/Desert-Fireball-Maintainence-GUI/static/downloads; cp {0} /opt/dfn-software/Desert-Fireball-Maintainence-GUI/static/downloads/ && echo SUCCESS"
extractThumbnail = "mkdir /opt/dfn-software/Desert-Fireball-Maintainence-GUI/static/downloads; exiv2 -ep3 -l /opt/dfn-software/Desert-Fireball-Maintainence-GUI/static/downloads/ {0} && SUCCESS"
shutterCount = "exiv2 -pa {0} | grep Nikon3\.ShutterCount | grep -oP '[0-9]{5}'"

enableHardDrive = "python /opt/dfn-software/enable_ext-hd.py;"
hddSpace = "cat /tmp/dfn_disk_usage"
runSmartTest = "smartctl -d {0} -t short /dev/sdb;"

cfcheck = "python /opt/dfn-software/camera_image_count.py"
intervalTest = "/opt/dfn-software/interval_control_test.sh;"
checkIntervalResults = "ls -lR /data0/latest_prev/*.NEF | wc -l"
checkPrevIntervalStatus = "find /data0/latest -exec stat -c%y {} \; | sort -n -r | head -n 1"

getLogfileName = "ls /data0/{0} | grep .txt"

# Strings used as web console output
cameraSwitchedOn = "Camera on command executed. Check status for confirmation.\n"
cameraSwitchedOff = "Camera off command executed. Check status for confirmation.\n"
videoCameraSwitchedOn = "Video camera switched on. Check status for confirmation.\n"
videoCameraSwitchedOff = "Video camera switched off. Check status for confirmation.\n"
cameraCheckOn = "\nCAMERA STATUS:\nCamera online.\n"
cameraCheckOff = "\nCAMERA STATUS:\nCamera not found.\n"

gpsCheckFailed = "\nGPS STATUS:\nGPS offline.\n"
gpsOnline = "\nGPS STATUS:\nLock: {0}\nSatellites: {1}\nLatitude: {2}\nLongitude: {3}\nAltitude: {4}"
timezoneChanged = "\nTime zone changed to {0}.\n"

internetCheckPassed = "\nINTERNET STATUS:\nInternet access available at {0}.\n"
internetCheckFailed = "\nINTERNET STATUS:\nNo internet access.\n"

vpnCheckPassed = "\nVPN STATUS:\nVPN connection available at {0}.\n"
vpnCheckFailed = "\nVPN STATUS:\nNo VPN connection available.\n"

intervalTestPassed = "\nINTERVAL TEST RESULTS:\nInterval test passed.\n"
intervalTestFailed = "\nINTERVAL TEST RESULTS:\nInterval test failed.\n"
prevIntervalDidRun = "\nINTERVAL CONTROL RAN SUCCESSFULLY LAST NIGHT.\n"
prevIntervalNotRun = "\nINTERVAL CONTROL DID NOT RUN SUCCESSFULLY LAST NIGHT.\n"

hddCommandedOn = "Hard drive power on command executed.\n"
hddCommandedOff = "Hard drive power off successful.\n"
hddOffFailed = "Hard drive power off failed. Power off aborted.\n"
smartTestCommandNotInstalled = "Smart test command not installed. Please contact 265815F@curtin.edu.au."

scriptNotFound = "Script not found: {0}."
pictureNotFound = "Picture not found."

# File paths
diskUsagePath = "/tmp/dfn_disk_usage"

import os

environment = os.getenv('APP_SETTINGS')

if environment:
    dfnconfigPath = 'dfnstation.cfg'
else:
    dfnconfigPath = "/opt/dfn-software/dfnstation.cfg"

# Script not found names
cameraOnScriptNotFound = scriptNotFound.format("enable_camera.py")
cameraOffScriptNotFound = scriptNotFound.format("disable_camera.py")
videoCameraOnScriptNotFound = scriptNotFound.format("enable_video.py")
videoCameraOffScriptNotFound = scriptNotFound.format("disable_video.py")
hddOnScriptNotFound = scriptNotFound.format("enable_ext-hd.py")
hddOffScriptNotFound = scriptNotFound.format("disable_ext-hd.py")
leostickStatusScriptNotFound = scriptNotFound.format("leostick_get_status.py")
intervalControlTestScriptNotFound = scriptNotFound.format("interval_control_test.sh")
cfCheckScriptNotFound = scriptNotFound.format("camera_image_count.py")

# Whitelist for which config variables the user can modify
configBoxWhitelist = {}
configBoxWhitelist["camera"] = {
    "camera_exposuretime",
    "camera_fstop",
    "still_lens",
    "vid_lens",
    "vid_ser_no",
    "vid_camera",
    "camera_ser_no",
    "vid_format",
    "still_camera",
    "camera_iso"
}

configBoxWhitelist["link"] = {
    "local_contact_email",
    "local_contact_name"
}

configBoxWhitelist["station"] = {
    "location",
    "lat",
    "altitude",
    "hostname",
    "lon"
}

configNotFound = "Config file not found."


