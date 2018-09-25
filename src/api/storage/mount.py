"""The storage mount api module /storage/mount endpoint."""

from flask_jwt_extended import jwt_required
from subprocess import CalledProcessError

from src.wrappers import endpoint, current_app_injecter, log_doc
from src.console import console
from .partitions import check


__all__ = ['mount', 'get']

@log_doc('Mounting external drives...')
@current_app_injecter(config = ['DRRIVES'])
def mount(config):
	for drive in config.drives:
		try:
			console('mount {0}'.format(drive['mount']))
		except CalledProcessError:
			pass


@jwt_required
@endpoint(prefix = 'api/storage/mount')
@current_app_injecter
def get(handler):
	mount()

	handler.add_to_response(partitions = check())
