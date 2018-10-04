from src.wrappers import jwt, endpoint, current_app_injecter, logger
from src.console import console


__all__ = ['on', 'off']
# TODO: Check if the video camera is on / off (much like camera status) as an endpoint.


@jwt
@logger('Enabling video camera.')
@endpoint()
@current_app_injecter()
def on():
	console('python /opt/dfn-software/enable_video.py')


@jwt
@logger('Disabling video camera.')
@endpoint()
@current_app_injecter()
def off():
	console('python /opt/dfn-software/disable_video.py')
