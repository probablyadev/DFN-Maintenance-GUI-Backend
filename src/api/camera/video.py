from src.console import console
from src.wrappers import endpoint, logger


# TODO: Check if the video camera is on / off (much like camera status) as an handler.
@endpoint
@logger('Enabling video camera.')
def on():
	console('python /opt/dfn-software/enable_video.py')


@endpoint
@logger('Disabling video camera.')
def off():
	console('python /opt/dfn-software/disable_video.py')
