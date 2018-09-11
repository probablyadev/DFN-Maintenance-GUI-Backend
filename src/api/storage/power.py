"""The storage power api module /storage/power endpoints."""

from flask_jwt import jwt_required
from flask import jsonify
from time import sleep

from src.wrappers import wrap_error
from src.console import console


__all__ = ['on', 'off']


@jwt_required()
@wrap_error()
def on():
	console('python /opt/dfn-software/enable_ext-hd.py')

	sleep(25)

    # For EXT, re-scan SATA/SCSI hotswap drives.
    if 'EXT' in console('hostname'):
        console("for i in $(find /sys/class/scsi_host/ -name host* ); do echo '- - -' > $i/scan")
        sleep(2)

	return 200


@jwt_required()
@wrap_error()
def off():
	ext = True if 'EXT' in console('hostname') else False

    # For EXT, delete the devices ONLY if they're all not solid state devices.
    if ext:
    	# Used for deleting devices in EXTs before powering off.
		devices = ['sdb', 'sdc', 'sdd']

		for device in devices:
            # Check if the device is a solid state or HDD.
            driveRotation = console("smartctl -i /dev/{0} | grep 'Rotation Rate:'".format(device))

            if not re.search('[0-9]', driveRotation):
                raise RuntimeError(
                    'External drives are not on correct device label. Use the command line to resolve this.')

        for device in devices:
            console('echo 1 > /sys/block/{0}/device/delete'.format(device))

        sleep(1)

	# Power off.
	console('python /opt/dfn-software/disable_ext-hd.py')

    # Sleep if EXT, needs time to remove drives.
    if ext:
        sleep(22)

	return 200
