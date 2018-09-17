"""The storage mount api module /storage/mount endpoint."""

from flask_jwt_extended import jwt_required
from flask import jsonify, current_app
from subprocess import CalledProcessError

from src.wrappers import wrap_error
from src.console import console
from .partitions import check


__all__ = ['mount', 'get']


def mount(check = True):
	for drive in current_app.config['DRIVES_TO_CHECK']:
		if drive['modify'] is True:
			try:
				console('mount {0}'.format(drive['mount']))
			except CalledProcessError:
				pass

	if check:
		return check()


@jwt_required
@wrap_error()
def get():
	return jsonify(partitions = mount()), 200
