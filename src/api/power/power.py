import src.wrappers as wrappers
from src.console import console


@wrappers.jwt
@wrappers.endpoint
@wrappers.logger('Shutting down the server.')
def shutdown():
	console('shutdown --poweroff now')


@wrappers.jwt
@wrappers.endpoint
@wrappers.logger('Restarting the server.')
def restart():
	console('shutdown --reboot now')
