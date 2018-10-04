from src.console import console
from src.wrappers import endpoint, current_app_injecter, logger


__all__ = ['hostname', 'get']


def hostname():
	return console('hostname')


@logger('Getting systems hostname.')
@endpoint()
@current_app_injecter()
def get(handler):
	handler.add_to_success_response(hostname = hostname())
