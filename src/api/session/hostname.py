"""The session hostname api module /session/hostname endpoint."""

from src.console import console
from src.wrappers import endpoint, current_app_injecter, log_doc


__all__ = ['hostname', 'get']


def hostname():
	return console('hostname')


@log_doc('Getting systems hostname.')
@endpoint()
@current_app_injecter()
def get(handler):
	handler.add_to_response(hostname = hostname())
