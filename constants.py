# This file stores all constants used in this GUI.
# The major constant here are different bash commands, executed server-side.
statusCheck = "NOT IMPLEMENTED YET"
gpsCheck = "echo gG > /dev/leostick && cat /dev/leostick"
cameraOn = "python /opt/dfn-software/enable_camera.py"
cameraOff = "python /opt/dfn-software/disable_camera.py"
enableHardDrive = "python /opt/dfn-software/enable_ext-hd.py"
disableHardDrive = "python /opt/dfn-software/disable_ext-hd.py"
unmountHardDrive = "umount /data1 && umount /data2"
checkSpace = "du /data1 && du /data2"
