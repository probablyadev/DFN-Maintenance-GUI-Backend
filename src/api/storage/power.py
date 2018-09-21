"""The storage power api module /storage/power endpoints."""

from flask_jwt_extended import jwt_required
from flask import jsonify, current_app
from time import sleep
from re import search, sub
from logging import getLogger
from os import walk

from src.wrappers import wrap_error
from src.console import console
from src.api.session.hostname import hostname
from .partitions import check
from .unmount import unmount


__all__ = ['on', 'off']
log = getLogger(__name__)


def _poll():
	initial_count = len(next(walk('/sys/block'))[1])
	current_count = initial_count
	current = 0
	limit = 20

	while current < limit and initial_count == current_count:
		sleep(1)

		current = current + 1
		current_count = len(next(walk('/sys/block'))[1])

	sleep(3)


@jwt_required
@wrap_error()
def on():
	console('python /opt/dfn-software/enable_ext-hd.py')

	_poll()

	partitions, load_error = check()

	return jsonify(partitions = partitions, load_error = load_error), 200


@jwt_required
@wrap_error()
def off():
	unmount()

	ext = True if 'EXT' in hostname() else False

	# For EXT, delete the devices ONLY if they're all not solid state devices.
	if ext:
		# Used for deleting devices in EXTs before powering off.
		drives = current_app.config['DRIVES']

		for drive in drives:
			# Check if the drive is an SSD or HDD.
			rotation = console("smartctl -i {0} | grep 'Rotation Rate:'".format(drive['device']))

			if not search('[0-9]', rotation):
				raise RuntimeError('External drive {0} is listed as an SSD, while it should be a HDD. Use the command line to resolve this.')

		for drive in drives:
			device = sub('/dev/', '', drive['device'])
			device = sub('[0-9]', '', device)

			console('echo 1 > /sys/block/{0}/device/delete'.format(device))

		sleep(1)

	# Power off.
	console('python /opt/dfn-software/disable_ext-hd.py')

	# Sleep if EXT, needs time to remove drives.
	if ext:
		sleep(22)

	partitions, load_error = check()

	return jsonify(partitions = partitions, load_error = load_error), 200
