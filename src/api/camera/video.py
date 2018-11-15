import src.wrappers as wrappers
from src.console import console


# TODO: Check if the video camera is on / off (much like camera status) as an endpoint.
@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.logger('Enabling video camera.')
@wrappers.injector
def on(handler):
	handler.add({ 'output': console('python /opt/dfn-software/enable_video.py') })


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.logger('Disabling video camera.')
@wrappers.injector
def off(handler):
	handler.add({ 'output': console('python /opt/dfn-software/disable_video.py') })
