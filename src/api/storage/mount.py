from subprocess import CalledProcessError

from src.wrappers import endpoint, logger, injector
from src.console import console
from .partitions import disk_partitions


@logger('Mounting external drives...')
@injector
def mount(config):
	for drive in config.drives:
		try:
			console('mount {0}'.format(drive['mount']))
		except CalledProcessError:
			pass


@endpoint
def get(handler):
	mount()
	handler.add_to_success_response(partitions = disk_partitions())
