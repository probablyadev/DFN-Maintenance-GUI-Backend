from src.console import console
from src.wrappers import handler, injector, logger


def hostname():
	return console('hostname')


@logger('Getting systems hostname.')
@handler
@injector
def get(handler):
	handler.add_to_success_response(hostname = hostname())
