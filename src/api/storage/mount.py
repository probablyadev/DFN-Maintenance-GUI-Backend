from subprocess import CalledProcessError

from src.wrappers import endpoint, current_app_injector, logger, jwt
from src.console import console
from .partitions import check


__all__ = ['mount', 'get']

@logger('Mounting external drives...')
@current_app_injector
def mount(config):
	for drive in config.drives:
		try:
			console('mount {0}'.format(drive['mount']))
		except CalledProcessError:
			pass


@jwt
@endpoint
@current_app_injector
def get(handler):
	mount()

	handler.add_to_success_response(partitions = check())
