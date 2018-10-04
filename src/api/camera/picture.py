"""The camera picture api module /camera/picture endpoints."""

from src.wrappers import jwt, endpoint, current_app_injecter, logger
from src.console import console


__all__ = ['download', 'find']


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
def find(handler):
	pass
