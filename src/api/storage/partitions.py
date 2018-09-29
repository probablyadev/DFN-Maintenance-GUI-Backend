"""The storage check api module /storage/check endpoint."""

from re import sub, split
from json import load, loads

from src.wrappers import endpoint, current_app_injecter, log_doc, jwt
from src.console import console


__all__ = ['check', 'get']


@log_doc('Loading fs devices...')
@current_app_injecter(config = ['USE_DEV_COMMAND'])
def _list_fs_devices(config):
	# Load mounted / on devices.
	if config.use_dev_command:
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


@log_doc('Filtering df output...', level = 'DEBUG')
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


@log_doc('Loading disk usage...')
@current_app_injecter(config = ['DFN_DISK_USAGE_PATH'])
def _load_disk_usage(log, config):
	off_disk_usages = {}

	# Load mounted disk usage.
	raw_mounted_disk_usages = console('df -h --sync').splitlines()
	mounted_disk_usages = _filter_df(raw_mounted_disk_usages)

	try:
		# Load unmounted / off disk usage from file.
		with open(config.dfn_disk_usage_path) as file_data:
			off_disk_usages = file_data.readlines()

		off_disk_usages = _filter_df(off_disk_usages)

		# Remove any duplicates.
		for key in mounted_disk_usages:
			if off_disk_usages.get(key):
				del off_disk_usages[key]
	except FileNotFoundError as error:
		log.exception(error)
		log.info('{0} does not exist, creating file with current disk usage.'.format(config.dfn_disk_usage_path))

		with open(config.dfn_disk_usage_path, 'w+') as file_data:
			file_data.write(raw_mounted_disk_usages[0])

			for line in raw_mounted_disk_usages[1:]:
				if '/dev/sd' in line:
					file_data.write(line)

	return mounted_disk_usages, off_disk_usages


@log_doc('Checking mounted drives...')
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


@log_doc('Checking unmounted drives...')
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
@log_doc('Checking off drives...')
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


@log_doc('Gathering debug output...', level = 'DEBUG')
@current_app_injecter()
def _debug_output(partitions, log):
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


@log_doc('Loading disk partitions and usage...')
def check():
	partitions = []
	devices = _list_fs_devices()
	mounted_disk_usages, off_disk_usages = _load_disk_usage()

	_mounted_drives(partitions, devices, mounted_disk_usages)
	_unmounted_drives(partitions, devices, off_disk_usages)
	_off_drives(partitions, off_disk_usages)

	return partitions


@jwt
@endpoint(prefix = 'api/storage/partitions')
@current_app_injecter(config = ['VERBOSE'])
def get(handler, config):
	partitions = check()

	if config.verbose:
		_debug_output(partitions)

	handler.add_to_response(partitions = partitions)

