"""The camera video api module /camera/video endpoints."""

from src.wrappers import jwt, endpoint, current_app_injecter, logger
from src.console import console


__all__ = ['on', 'off']


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
