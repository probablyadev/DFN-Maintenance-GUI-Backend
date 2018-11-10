import src.wrappers as wrappers
from src.console import console


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.logger('Shutting down the server.')
@wrappers.injector
def shutdown():
	console('shutdown --poweroff now')


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.logger('Restarting the server.')
@wrappers.injector
def restart():
	console('shutdown --reboot now')
