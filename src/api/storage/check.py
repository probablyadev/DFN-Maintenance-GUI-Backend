"""The storage api module /session endpoints."""

from flask_jwt import jwt_required
from flask import jsonify, current_app
from psutil import disk_partitions, disk_usage
from re import sub, split

from src.console import exception_json
from src.wrappers import wrap_error


__all__ = ['check']


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


def _mounted_drives():
	mounted = []
	devices = []

	for part in disk_partitions(all = False):
		if part.fstype == 'ext4':
			usage = disk_usage(part.mountpoint)

			mounted.append({
				'device': part.device,
				'total': _bytes2human(usage.total),
				'used': _bytes2human(usage.used),
				'free': _bytes2human(usage.free),
				'percent': usage.percent,
				'type': part.fstype,
				'mount': part.mountpoint
			})

			devices.append(part.device)

	return mounted, devices


def _unmounted_drives(devices):
	unmounted = []

	with open(current_app.config['DFN_DISK_USAGE_PATH']) as f:
		lines = f.readlines()

	for line in lines[1:]:
		line = sub("\n", "", line)
		line = sub(" +", ",", line)
		line = sub("%", "", line)
		line = split(",", line)

		if line[0] not in devices:
			unmounted.append({
				'device': line[0],
				'total': line[1],
				'used': line[2],
				'free': line[3],
				'percent': line[4],
				'type': '...',
				'mount': line[5]
			})

	return unmounted


@jwt_required()
@wrap_error
def check():
	partitions = {}
	partitions['mounted'], devices = _mounted_drives()
	partitions['unmounted'] = _unmounted_drives(devices)

	return jsonify(partitions = partitions), 200
