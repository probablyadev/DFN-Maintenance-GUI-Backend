"""The storage power api module /storage/power endpoints."""

from flask_jwt import jwt_required
from flask import jsonify, current_app
from time import sleep
from re import search, sub

from src.wrappers import wrap_error
from src.console import console
from src.api.session.hostname import hostname
from .check import check
from .unmount import unmount


__all__ = ['on', 'off']


@jwt_required()
@wrap_error()
def on():
	console('python /opt/dfn-software/enable_ext-hd.py')

	# Give drives time to register.
	sleep(25)

    # For EXT, re-scan SATA/SCSI hotswap drives.
    if 'EXT' in hostname():
        console("for i in $(find /sys/class/scsi_host/ -name host* ); do echo '- - -' > $i/scan")
        sleep(2)

	return jsonify(partitions = mount()), 200


@jwt_required()
@wrap_error()
def off():
	unmount(False)

	ext = True if 'EXT' in hostname() else False

    # For EXT, delete the devices ONLY if they're all not solid state devices.
    if ext:
    	# Used for deleting devices in EXTs before powering off.
		drives_to_check = current_app.config['DRIVES_TO_CHECK']

		for drive in drives_to_check:
			if drive['modify'] is True:
				# Check if the drive is an SSD or HDD.
				rotation = console("smartctl -i {0} | grep 'Rotation Rate:'".format(drive['device']))

				if not search('[0-9]', rotation):
					raise RuntimeError('External drive {0} is listed as an SSD, while it should be a HDD. Use the command line to resolve this.')

        for drive in drives_to_check:
			device = sub('/dev/', '', drive['device'])
            console('echo 1 > /sys/block/{0}/device/delete'.format(device))

        sleep(1)

	# Power off.
	console('python /opt/dfn-software/disable_ext-hd.py')

    # Sleep if EXT, needs time to remove drives.
    if ext:
        time.sleep(22)

	return jsonify(partitions = check()), 200
