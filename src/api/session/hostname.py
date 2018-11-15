import src.wrappers as wrappers
from src.console import console


@wrappers.logger('Getting systems hostname.')
def hostname():
	return console('hostname').strip('\n')


@wrappers.endpoint
@wrappers.injector
def get(handler):
	handler.add({ 'hostname': hostname() })
