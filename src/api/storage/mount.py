"""The storage mount api module /storage/mount endpoint."""

from flask_jwt_extended import jwt_required
from flask import jsonify, current_app
from subprocess import CalledProcessError

from src.wrappers import old_endpoint
from src.console import console
from .partitions import check


__all__ = ['mount', 'get']


def mount():
	for drive in current_app.config['DRIVES']:
		try:
			console('mount {0}'.format(drive['mount']))
		except CalledProcessError:
			pass


@jwt_required
@old_endpoint()
def get():
	mount()
	partitions, load_error = check()

	return jsonify(partitions = partitions, load_error = load_error), 200
