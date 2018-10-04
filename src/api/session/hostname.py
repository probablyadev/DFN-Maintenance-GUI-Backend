from src.console import console
from src.wrappers import endpoint, injector, logger


__all__ = ['hostname', 'get']


def hostname():
	return console('hostname')


@logger('Getting systems hostname.')
@endpoint
@injector
def get(handler):
	handler.add_to_success_response(hostname = hostname())
