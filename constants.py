# This file stores all constants used in this GUI.
# The major constant here are different bash commands, executed server-side.
gpsCheck = "echo gG > /dev/leostick && cat /dev/leostick"
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

# TODO: DOWNLOAD TO USB COMMAND

# Strings used as web console output
cameraSwitchedOn = "Camera on command executed.\n"
cameraSwitchedOff = "Camera off command executed.\n"
cameraCheckOn = "Camera online.\n"
cameraCheckOff = "Camera not found.\n"
gpsCheckFailed = "GPS offline.\n"
gpsOnline = "Lock: {0}\nSatellites: {1}\n"