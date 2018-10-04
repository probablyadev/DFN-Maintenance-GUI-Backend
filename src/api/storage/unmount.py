from subprocess import CalledProcessError

from src.wrappers import endpoint, injector, logger, jwt
from src.console import console
from .partitions import check


__all__ = ['unmount', 'get']


@logger('Unmounting external drives...')
@injector
def unmount(config):
	for drive in config.drives:
		try:
			console('umount {0}'.format(drive['mount']))
		except CalledProcessError:
			pass


@jwt
@endpoint
@injector
def get(handler):
	unmount()

	handler.add_to_success_response(partitions = check())
