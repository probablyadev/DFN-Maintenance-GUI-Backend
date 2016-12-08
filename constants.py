# This file stores all constants used in this GUI.
# The major constants here are different bash commands, executed server-side.
gpsCheck = "echo G > /dev/leostick && cat /dev/leostick"
cameraOn = "python /opt/dfn-software/enable_camera.py"
cameraOff = "python /opt/dfn-software/disable_camera.py"
cameraCheck = "lsusb"
enableHardDrive = "python /opt/dfn-software/enable_ext-hd.py"
disableHardDrive = "python /opt/dfn-software/disable_ext-hd.py"
unmountHardDrive = "umount /data1 && umount /data2"
hddStatus = "du /data1 && du /data2"
internetCheck = "ping -c 1 www.google.com"
vpnCheck = "ping -c 1 10.1.16.1"
intervalTest = "/opt/dfn-software/interval_control_test.sh"
checkIntervalResults = "ls -lR /data0/latest_prev/*.NEF | wc -l"

# TODO: DOWNLOAD TO USB COMMAND

# Strings used as web console output
cameraSwitchedOn = "Camera on command executed.\n"
cameraSwitchedOff = "Camera off command executed.\n"
cameraCheckOn = "\nCAMERA STATUS:\nCamera online.\n"
cameraCheckOff = "\nCAMERA STATUS:\nCamera not found.\n"
gpsCheckFailed = "\nGPS STATUS:\nGPS offline.\n"
gpsOnline = "\nGPS STATUS:\nLock: {0}\nSatellites: {1}\n"
internetCheckPassed = "\nINTERNET STATUS:\nInternet access available.\n"
internetCheckFailed = "\nINTERNET STATUS:\nNo internet access.\n"
vpnCheckPassed = "\nVPN STATUS:\nVPN connection available.\n"
vpnCheckFailed = "\nVPN STATUS:\nNo VPN connection available.\n"
intervalTestPassed = "\nINTERVAL TEST RESULTS:\nInterval test passed.\n"
intervalTestFailed = "\nINTERVAL TEST RESULTS:\nInterval test failed.\n"