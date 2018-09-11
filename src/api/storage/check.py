"""The storage api module /storage endpoints."""

from flask_jwt import jwt_required
from flask import jsonify, current_app
from psutil import disk_partitions, disk_usage
from re import sub, split

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


def _mounted_drives(partitions):
	for part in disk_partitions(all = False):
		if part.fstype == 'ext4':
			usage = disk_usage(part.mountpoint)

			partitions.append({
				'device': part.device,
				'status': 'mounted',
				'total': _bytes2human(usage.total),
				'used': _bytes2human(usage.used),
				'free': _bytes2human(usage.free),
				'percent': usage.percent,
				'type': part.fstype,
				'mount': part.mountpoint
			})


def _unmounted_drives(partitions):
	with open(current_app.config['DFN_DISK_USAGE_PATH']) as f:
		lines = f.readlines()

	for line in lines[1:]:
		line = sub("\n", "", line)
		line = sub(" +", ",", line)
		line = sub("%", "", line)
		line = split(",", line)

		if not any(line[0] in sublist['device'] for sublist in partitions):
			partitions.append({
				'device': line[0],
				'status': 'unmounted',
				'total': line[1],
				'used': line[2],
				'free': line[3],
				'percent': line[4],
				'type': '...',
				'mount': line[5]
			})


@jwt_required()
@wrap_error()
def check():
	partitions = []

	_mounted_drives(partitions)
	_unmounted_drives(partitions)

	return jsonify(partitions = partitions), 200
