"""The storage check api module /storage/check endpoint."""

from flask_jwt import jwt_required
from flask import jsonify, current_app
from psutil import disk_partitions, disk_usage
from re import sub, split
from json import load, loads
from logging import getLogger, DEBUG

from src.wrappers import wrap_error
from src.console import console


__all__ = ['check', 'get']
log = getLogger(__name__)


def _bytes2human(n):
	symbols = ('K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y')
	prefix = {}

	for i, s in enumerate(symbols):
		prefix[s] = 1 << (i + 1) * 10

	for s in reversed(symbols):
		if n >= prefix[s]:
			value = float(n) / prefix[s]

			return '%.1f%s' % (value, s)

	return "%sB" % n


def _mounted_drives(partitions, drives_to_check):
	for part in disk_partitions(all = False):
		for drive in drives_to_check:
			if drive['device'] in part.device or drive['mount'] in part.mountpoint:
				usage = disk_usage(part.mountpoint)

				partitions.append({
					'status': 'mounted',
					'device': part.device,
					'total': _bytes2human(usage.total),
					'used': _bytes2human(usage.used),
					'free': _bytes2human(usage.free),
					'percent': usage.percent,
					'type': part.fstype,
					'mount': part.mountpoint
				})

				drives_to_check.remove(drive)


def _unmounted_drives(partitions, drives_to_check):
	try:
		if current_app.config['USE_DEV_COMMAND']:
			with open('sample/lsblk.json') as json_data:
				output = load(json_data)
		else:
			output = loads(console('lsblk -fs --json'))

		for drive in drives_to_check:
			for sublist in output['blockdevices']:
				if drive['device'] in sublist['name']:
					partitions.append({
						'status': 'unmounted',
						'device': sublist['name'],
						'total': sublist['size'],
						'used': '',
						'free': '',
						'percent': '',
						'type': sublist['fstype'],
						'mount': ''
					})

					drives_to_check.remove(drive)
	except FileNotFoundError:
		pass


# BUG: sdd1 and sdb1 are swapped in the dfn_disk_usage file (mount points), possibly causing them to not be listed.
def _off_drives(partitions, drives_to_check):
	try:
		with open(current_app.config['DFN_DISK_USAGE_PATH']) as file_data:
			lines = file_data.readlines()

		for line in lines[1:]:
			line = sub("\n", "", line)
			line = sub(" +", ",", line)
			line = sub("%", "", line)
			line = split(",", line)

			for sublist in partitions:
				if line[0] in sublist['device'] and sublist['status'] is 'unmounted':
					sublist['total'] = line[1]
					sublist['used'] = line[2]
					sublist['free'] = line[3]
					sublist['percent'] = line[4]

			for drive in drives_to_check:
				if line[0] in drive['device'] and line[5] in drive['mount']:
					partitions.append({
						'status': 'off',
						'device': line[0],
						'total': line[1],
						'used': line[2],
						'free': line[3],
						'percent': line[4],
						'type': '',
						'mount': ''
					})

					drives_to_check.remove(drive)
	except FileNotFoundError:
		pass


def _debug_output(partitions):
	from pprint import pformat

	mounted = []
	unmounted = []
	off = []

	for sublist in partitions:
		if sublist['status'] is 'mounted':
			mounted.append({
				'device': sublist['device'],
				'mount': sublist['mount']
			})
		elif sublist['status'] is 'unmounted':
			unmounted.append({
				'device': sublist['device'],
				'mount': sublist['mount']
			})
		else:
			off.append({
				'device': sublist['device'],
				'mount': sublist['mount']
			})

	mounted = pformat(mounted)
	unmounted = pformat(unmounted)
	off = pformat(off)

	log.debug('mounted:\n{0}'.format(mounted))
	log.debug('unmounted:\n{0}'.format(unmounted))
	log.debug('off:\n{0}'.format(off))


def check():
	partitions = []
	# TODO: Check if this works: current_app.config.DRIVES_TO_CHECK.copy()
	drives_to_check = current_app.config['DRIVES_TO_CHECK'].copy()

	# TODO: Include only drives with a specific fs (ext4, etc.).
	_mounted_drives(partitions, drives_to_check)
	_unmounted_drives(partitions, drives_to_check)
	_off_drives(partitions, drives_to_check)

	return partitions


@jwt_required()
@wrap_error()
def get():
	partitions = check()

	if log.isEnabledFor(DEBUG):
		_debug_output(partitions)

	return jsonify(partitions = partitions), 200
