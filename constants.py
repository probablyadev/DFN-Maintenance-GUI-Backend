# This file stores all constants used on the server-side of the GUI.
# The major constants here are different bash commands, executed server-side.
gpsCheck = "python /opt/dfn-software/leostick_get_status.py -g"
setTimezone = "sudo ln -fs /usr/share/zoneinfo/{0} /etc/localtime"
outputTime = "date"

cameraOn = "python /opt/dfn-software/enable_camera.py"
cameraOff = "python /opt/dfn-software/disable_camera.py"
videoCameraOn = "python /opt/dfn-software/enable_video.py && echo SUCCESS"
videoCameraOff = "python /opt/dfn-software/disable_video.py && echo SUCCESS"
cameraCheck = "lsusb"
cameraActuation = "ls /data0/latest/*.NEF | xargs exiv2 | grep 'Shutter Speed'"
getDirectorySize = "du -sh {0} | egrep -o '[0-9]+[A-Z]+'"
getNumFilesInDirectory = 'find {0} -type f | wc -l'
findPictures = "find /data[0-3] -type d -name '*{0}-{1}-{2}*' | grep -v 'test\|video'"
copyFileToStatic = "mkdir /opt/dfn-software/GUI/static/downloads; cp {0} /opt/dfn-software/GUI/static/downloads/ && echo SUCCESS"
extractThumbnail = "mkdir /opt/dfn-software/GUI/static/downloads; exiv2 -ep3 -l /opt/dfn-software/GUI/static/downloads/ {0} && SUCCESS"
shutterCount = "exiv2 -pa {0} | grep Nikon3\.ShutterCount | grep -oP '[0-9]{5}'"

enableHardDrive = "python /opt/dfn-software/enable_ext-hd.py"
disableHardDrive = "python /opt/dfn-software/disable_ext-hd.py"
mountHardDrive = "mount {0} && echo SUCCESS"
unmountHardDrive = "umount {0} && echo SUCCESS"
formatHardDrive = "/opt/dfn-software/Shipped/formatHDDs.sh {0} {1} {2} {3}"
hddPoweredStatus = "lsusb"
data0PoweredStatus = "df | grep /data0 && echo SUCCESS"
mountedStatus = "mount | grep {0} > /dev/null && echo 1"
hddSpace = "cat /tmp/dfn_disk_usage"
runSmartTest = "smartctl -d {0} -t short /dev/sdb && echo SUCCESS"
checkSmartTest= "smartctl -d {0} -a /dev/sdb"

internetCheck = "ping -c 1 www.google.com"
getInternetIP = "ifconfig | grep eth1 -A 1 | grep -o 'addr:[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | cut -c6-"
restartModem = "ifdown ppp0; sleep 8; ifup ppp0; sleep 8; ifconfig ppp0 && echo SUCCESS"

vpnCheck = "ping -c 1 10.1.16.1"
getVpnIP = "ifconfig | grep tun0 -A 1 | grep -o 'addr:[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'| cut -c6-"
restartVPN = "service openvpn restart; sleep 10; ifconfig tun0 && echo SUCCESS"

intervalTest = "/opt/dfn-software/interval_control_test.sh"
checkIntervalResults = "ls -lR /data0/latest_prev/*.NEF | wc -l"
checkPrevIntervalStatus = "find /data0/latest -exec stat -c%y {} \; | sort -n -r | head -n 1"

getLogfileName = "ls /data0/{0} | grep .txt"

# Strings used as web console output
cameraSwitchedOn = "Camera on command executed.\n"
cameraSwitchedOff = "Camera off command executed.\n"
videoCameraSwitchedOn = "Video camera switched on.\n"
videoCameraSwitchedOff = "Video camera switched off.\n"
videoCameraOperationFailed = "Video camera operation failed.\n"
cameraCheckOn = "\nCAMERA STATUS:\nCamera online.\n"
cameraCheckOff = "\nCAMERA STATUS:\nCamera not found.\n"

gpsCheckFailed = "\nGPS STATUS:\nGPS offline.\n"
gpsOnline = "\nGPS STATUS:\nLock: {0}\nSatellites: {1}\nLatitude: {2}\nLongitude: {3}\nAltitude: {4}"
timezoneChanged = "\nTime zone changed to {0}.\n"

internetCheckPassed = "\nINTERNET STATUS:\nInternet access available at {0}.\n"
internetCheckFailed = "\nINTERNET STATUS:\nNo internet access.\n"
modemRestartPassed = "\nModem restarted successfully.\n"
modemRestartFailed = "\nERROR: modem unable to restart successfully. Please try again.\n"

vpnCheckPassed = "\nVPN STATUS:\nVPN connection available at {0}.\n"
vpnCheckFailed = "\nVPN STATUS:\nNo VPN connection available.\n"
vpnRestartPassed = "\nVPN restarted successfully.\n"
vpnRestartFailed = "\nERROR: VPN unable to restart successfully. Please try again.\n"

intervalTestPassed = "\nINTERVAL TEST RESULTS:\nInterval test passed.\n"
intervalTestFailed = "\nINTERVAL TEST RESULTS:\nInterval test failed.\n"
prevIntervalDidRun = "\nINTERVAL CONTROL RAN SUCCESSFULLY LAST NIGHT.\n"
prevIntervalNotRun ="\nINTERVAL CONTROL DID NOT RUN SUCCESSFULLY LAST NIGHT.\n"

hddStatusString = "\nHARD DRIVE STATUS:\nSystem Drive: {0}, {1} full.\nDrive #1: {2}, {3} full.\nDrive #2: {4}, {5} full.\nDrive #3: {6}, {7} full.\n"
hddStatusOff = "Not detected"
hddStatusPowered = "Powered"
hddStatusMounted = "Mounted"

hddCommandedOn = "Hard drive power on command executed.\n"
hddCommandedOff = "Hard drive power off successful.\n"
hddOffFailed = "Hard drive unmount failed. Power off aborted.\n"
hddNotPoweredError = "Hard drives need to be powered."
hddAlreadyOn = "Hard drives already powered.\n"
hddAlreadyOff = "Hard drives already powered off.\n"
hddAlreadyMountedError = "Hard drives may have already been mounted. See status for confirmation."
smartTestStartedSuccess = "\nSmart test for {0} successfully executed.\n"
smartTestStartedFailed = "\nSmart test {0} failed execution (try re-powering drives).\n"
smartTestResultsPassed = "Smart test for {0} passed.\n"
smartTestResultsFailed = "Smart test for {0} failed.\n"

hddMountPassed = "{0} mounted successfully.\n"
hddMountFailed = "{0} mount error: {1}\n"
hddUnmountPassed = "{0} unmounted successfully.\n"
hddUnmountFailed = "{0} unmount error: {1}\n"
hddAlreadyUnmountedError = "May have already been unmounted."

# Whitelist for which config variables the user can modify
configBoxWhitelist = ["vid_lens", "vid_format", "camera_fstop", "still_lens", "vid_ser_no",
                      "vid_camera", "camera_ser_no", "still_camera", "camera_iso",
                      "camera_exposuretime", "location", "hostname", "lat", "lon",
                      "altitude", "local_contact_email", "local_contact_name"]

configWriteFailed = "ERROR: Unable to write to config file (is internal drive mounted?)."
configWritePassed = "Overwritten {0} as {1}."

systemStatusHeader = "\n-----OVERALL SYSTEM STATUS-----\n"