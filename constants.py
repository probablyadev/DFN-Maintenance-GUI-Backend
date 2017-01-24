# This file stores all constants used in this GUI.
# The major constants here are different bash commands, executed server-side.
gpsCheck = "echo G > /dev/leostick && cat /dev/leostick"
setTimezone = "sudo ln -fs /usr/share/zoneinfo/{0} /etc/localtime"
outputTime = "date"

cameraOn = "python /opt/dfn-software/enable_camera.py"
cameraOff = "python /opt/dfn-software/disable_camera.py"
cameraCheck = "lsusb"
findPictures = "find /data[1-3] -type d -name '*{0}-{1}-{2}*' | grep -v 'test\|video'"
getDirectorySize = "du -sh {0} | egrep -o '[0-9]+[A-Z]+'"
getNumFilesInDirectory = 'find {0} -type f | wc -l'

enableHardDrive = "python /opt/dfn-software/enable_ext-hd.py"
disableHardDrive = "python /opt/dfn-software/disable_ext-hd.py"
mountHardDrive = "mount /data1 && echo SUCCESS; mount /data2 && echo SUCCESS"
unmountHardDrive = "umount /data1 && echo SUCCESS; umount /data2 && echo SUCCESS"
formatHardDrive = "/opt/dfn-software/Shipped/formatHDDs.sh {0} {1} {2} {3}"
hddPoweredStatus = "lsusb"
mountedStatus = "mount | grep {0} > /dev/null && echo 1"
hddSpace = "cat /tmp/dfn_disk_usage"

internetCheck = "ping -c 1 www.google.com"
getInternetIP = "ifconfig | grep eth1 -A 1 | grep -o 'addr:[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | cut -c6-"
restartModem = "ifdown ppp0 && ifup ppp0 && echo SUCCESS"

vpnCheck = "ping -c 1 10.1.16.1"
getVpnIP = "ifconfig | grep tun0 -A 1 | grep -o 'addr:[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'| cut -c6-"
restartVPN = "service openvpn restart && echo SUCCESS"

intervalTest = "/opt/dfn-software/interval_control_test.sh"
checkIntervalResults = "ls -lR /data0/latest_prev/*.NEF | wc -l"
checkPrevIntervalStatus = "find /data0/latest -exec stat -c%y {} \; | sort -n -r | head -n 1" # Actual, for now

getLogfileName = "ls /data0/{0} | grep .txt"

# Strings used as web console output
cameraSwitchedOn = "Camera on command executed.\n"
cameraSwitchedOff = "Camera off command executed.\n"
cameraCheckOn = "\nCAMERA STATUS:\nCamera online.\n"
cameraCheckOff = "\nCAMERA STATUS:\nCamera not found.\n"
findPictures = "find /data[0-3] -type d -name '*{0}-{1}-{2}*' | grep -v 'test\|video'"

gpsCheckFailed = "\nGPS STATUS:\nGPS offline.\n"
gpsOnline = "\nGPS STATUS:\nLock: {0}\nSatellites: {1}\n"
timezoneChanged = "\nTime zone changed to {0}.\n"

internetCheckPassed = "\nINTERNET STATUS:\nInternet access available at {0}.\n"
internetCheckFailed = "\nINTERNET STATUS:\nNo internet access.\n"
modemRestartPassed = "\nModem restarted successfully.\n"
modemRestartFailed = "\nERROR: modem unable to restart successfully.\n"

vpnCheckPassed = "\nVPN STATUS:\nVPN connection available at {0}.\n"
vpnCheckFailed = "\nVPN STATUS:\nNo VPN connection available.\n"
vpnRestartPassed = "\nVPN restarted successfully.\n"
vpnRestartFailed = "\nERROR: VPN unable to restart successfully.\n"

intervalTestPassed = "\nINTERVAL TEST RESULTS:\nInterval test passed.\n"
intervalTestFailed = "\nINTERVAL TEST RESULTS:\nInterval test failed.\n"
prevIntervalDidRun = "\nINTERVAL CONTROL SW RAN SUCCESSFULLY LAST NIGHT.\n"
prevIntervalNotRun ="\nINTERVAL CONTROL SW DID NOT RUN SUCCESSFULLY LAST NIGHT.\n"

hddStatusString = "\nEXT. HDD STATUS:\n/data1: {0}, {1} full.\n/data2: {2}, {3} full.\n/data3: {4}, {5} full.\n"
hddStatusOff = "Not detected"
hddStatusPowered = "Powered"
hddStatusMounted = "Mounted"

hddCommandedOn = "Enable ext. HDD command executed.\n"
hddCommandedOff = "Disable ext. HDD command executed.\n"
hddMountPassed = "HDD mount successful.\n"
hddMountFailed = "HDD mount error: {0}\n"
hddNotPoweredError = "HDDs need to be powered."
hddAlreadyMountedError = "HDDs may have already been mounted. See status for confirmation."

hddUnmountPassed = "HDD unmount successful.\n"
hddUnmountFailed = "HDD unmount error: {0}\n"
hddAlreadyUnmountedError = "HDDs may have already been unmounted. See status for confirmation."