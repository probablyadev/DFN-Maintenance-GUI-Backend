from subprocess import CalledProcessError

import src.wrappers as wrappers
from src.console import console
from .partitions import disk_partitions


@wrappers.logger('Mounting external drives.')
@wrappers.injector
def mount(config):
	for drive in config.drives:
		try:
			console('mount {0}'.format(drive['mount']))
		except CalledProcessError:
			pass


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.injector
def get(handler):
	mount()
	handler.add({ 'partitions': disk_partitions() })
