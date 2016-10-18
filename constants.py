# This file stores all constants used in this GUI.
# The major constant here are different bash commands, executed server-side.
statuscheck = "NOT IMPLEMENTED YET"
gpscheck = "echo gG > /dev/leostick && cat /dev/leostick"
cameraon = "python /opt/dfn-software/enable_camera.py"
cameraoff = "python /opt/dfn-software/disable_camera.py"
enableharddrive = "python /opt/dfn-software/enable_ext-hd.py"
disableharddrive = "python /opt/dfn-software/disable_ext-hd.py"
unmountharddrive = "umount /data1 && umount /data2"
checkspace = "du /data1 && du /data2"
