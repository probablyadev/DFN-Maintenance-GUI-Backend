"""The storage unmount api module /storage/unmount endpoint."""

from flask_jwt_extended import jwt_required
from flask import jsonify, current_app

from src.wrappers import wrap_error
from src.console import console
from .check import check


__all__ = ['unmount', 'get']


def unmount(check = True):
	for drive in current_app.config['DRIVES_TO_CHECK']:
		if drive['modify'] is True:
			try:
				console('umount {0}'.format(drive['mount']))
			except CalledProcessError:
				pass

	if check:
		return check()


@jwt_required
@wrap_error()
def get():
	return jsonify(partitions = unmount()), 200
