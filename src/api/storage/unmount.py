from subprocess import CalledProcessError

from src.wrappers import endpoint, logger, injector
from src.console import console
from .partitions import disk_partitions


@logger('Unmounting external drives...')
@injector
def unmount(config):
	for drive in config.drives:
		try:
			console('umount {0}'.format(drive['mount']))
		except CalledProcessError:
			pass


@endpoint
def get(handler):
	unmount()
	handler.add({ 'partitions': disk_partitions() })
