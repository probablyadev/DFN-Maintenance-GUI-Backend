"""The camera thumbnail api module /camera/thumbnail endpoints."""

from src.wrappers import jwt, endpoint, current_app_injecter, logger
from src.console import console


__all__ = ['download', 'remove']


@jwt
@logger('TODO: Implement endpoint')
@endpoint()
@current_app_injecter()
def download(handler):
	pass


@jwt
@logger('TODO: Implement endpoint')
@endpoint()
@current_app_injecter()
def remove(handler):
	pass
