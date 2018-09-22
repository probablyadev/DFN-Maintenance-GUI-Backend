"""The storage check api module /storage/check endpoint."""

from flask_jwt_extended import jwt_required
from flask import jsonify, current_app
from re import sub, split
from json import load, loads
from logging import getLogger, DEBUG

from src.wrappers import wrap_error
from src.console import console


__all__ = ['check', 'get']
log = getLogger(__name__)


def _list_fs_devices():
	# Load mounted / on devices.
	if current_app.config['USE_DEV_COMMAND']:
		with open('sample/lsblk.json') as json_data:
			output = load(json_data)
	else:
		output = loads(console('lsblk --inverse --nodeps --output NAME,LABEL,SIZE,FSTYPE,MOUNTPOINT --json'))

	devices = []

	# Filter out devices without a label i.e. data0 (except root '/').
	for device in output['blockdevices']:
		if '/dev/' not in device['name']:
			device['name'] = '/dev/{0}'.format(device['name'])

		if device['label'] is None and device['mountpoint'] is '/':
			device['label'] = ''

		if device['label'] is not None:
			devices.append(device)

	return devices


def _filter_df(output):
	disk_usages = {}

	for line in output[1:]:
		line = sub("\n", "", line)
		line = sub(" +", ",", line)
		line = split(",", line)

		if '/dev' in line[0]:
			disk_usages[line[0]] = {
				'size': line[1],
				'used': line[2],
				'free': line[3],
				'percent': line[4],
				'mount': line[5]
			}

	return disk_usages


def _load_disk_usage():
	load_error = False
	off_disk_usages = {}
	dfn_disk_usage_path = current_app.config['DFN_DISK_USAGE_PATH']

	# Load mounted disk usage.
	raw_mounted_disk_usages = console('df -h --sync').splitlines()
	mounted_disk_usages = _filter_df(raw_mounted_disk_usages)

	try:
		# Load unmounted / off disk usage from file.
		with open(dfn_disk_usage_path) as file_data:
			off_disk_usages = file_data.readlines()

		off_disk_usages = _filter_df(off_disk_usages)

		# Remove any duplicates.
		for key in mounted_disk_usages:
			if off_disk_usages.get(key):
				del off_disk_usages[key]
	except FileNotFoundError as error:
		log.exception(error)
		log.info('{0} does not exist, creating file with current disk usage.'.format(dfn_disk_usage_path))

		load_error = True

		with open(dfn_disk_usage_path) as file_data:
			file_data.write(raw_mounted_disk_usages[0])

			for line in raw_mounted_disk_usages[1:]:
				if '/dev/sd' in line:
					file_data.write(line)

	return mounted_disk_usages, off_disk_usages, load_error


def _mounted_drives(partitions, devices, mounted_disk_usages):
	for device in devices:
		if device['mountpoint'] is not None:
			usage = mounted_disk_usages.get(device['name'])

			if usage:
				partitions.append({
					'status': 'mounted',
					'label': device['label'],
					'device': device['name'],
					'size': usage['size'],
					'used': usage['used'],
					'free': usage['free'],
					'percent': usage['percent'],
					'type': device['fstype'],
					'mount': device['mountpoint']
				})


def _unmounted_drives(partitions, devices, off_disk_usages):
	for device in devices:
		if device['mountpoint'] is None:
			usage = off_disk_usages.get(device['name'])

			if usage:
				partitions.append({
					'status': 'unmounted',
					'label': device['label'],
					'device': device['name'],
					'size': usage['size'],
					'used': usage['used'],
					'free': usage['free'],
					'percent': usage['percent'],
					'type': device['fstype'],
					'mount': ''
				})

				del off_disk_usages[device['name']]
			else:
				partitions.append({
					'status': 'unmounted',
					'label': device['label'],
					'device': device['name'],
					'size': device['size'],
					'used': '',
					'free': '',
					'percent': '',
					'type': device['fstype'],
					'mount': ''
				})


# BUG: sdd1 and sdb1 are swapped in the dfn_disk_usage file (mount points), possibly causing them to not be listed.
def _off_drives(partitions, off_disk_usages):
	for key in off_disk_usages:
		device = off_disk_usages.get(key)

		partitions.append({
			'status': 'off',
			'label': '',
			'device': key,
			'size': device['size'],
			'used': device['used'],
			'free': device['free'],
			'percent': device['percent'],
			'type': '',
			'mount': ''
		})


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


# TODO: Debug logs to a handler for an endpoint. If debug flag is given then pass logs to frontend.
def check():
	partitions = []
	devices = _list_fs_devices()
	mounted_disk_usages, off_disk_usages, load_error = _load_disk_usage()

	_mounted_drives(partitions, devices, mounted_disk_usages)
	_unmounted_drives(partitions, devices, off_disk_usages)
	_off_drives(partitions, off_disk_usages)

	return partitions, load_error


@jwt_required
@wrap_error()
def get():
	partitions, load_error = check()

	if log.isEnabledFor(DEBUG):
		_debug_output(partitions)

	return jsonify(partitions = partitions, load_error = load_error), 200
