from subprocess import CalledProcessError

from src.wrappers import endpoint, injector, logger, jwt
from src.console import console
from .partitions import check


__all__ = ['mount', 'get']

@logger('Mounting external drives...')
@injector
def mount(config):
	for drive in config.drives:
		try:
			console('mount {0}'.format(drive['mount']))
		except CalledProcessError:
			pass


@jwt
@endpoint
@injector
def get(handler):
	mount()

	handler.add_to_success_response(partitions = check())
