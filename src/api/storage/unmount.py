"""The storage unmount api module /storage/unmount endpoint."""

from flask_jwt_extended import jwt_required
from subprocess import CalledProcessError

from src.wrappers import endpoint, current_app_injecter, log_doc
from src.console import console
from .partitions import check


__all__ = ['unmount', 'get']


@log_doc('Unmounting external drives...')
@current_app_injecter(config = ['DRIVES'])
def unmount(config):
	for drive in config.drives:
		try:
			console('umount {0}'.format(drive['mount']))
		except CalledProcessError:
			pass


@jwt_required
@endpoint(prefix = 'api/storage/unmount')
@current_app_injecter
def get(handler):
	unmount()

	handler.add_to_response(partitions = check())
