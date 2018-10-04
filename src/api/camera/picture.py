from src.wrappers import jwt, endpoint, current_app_injector, logger
from src.console import console


__all__ = ['download', 'find']


@jwt
@logger('TODO: Implement endpoint')
@endpoint
@current_app_injector
def download(handler):
	pass


@jwt
@logger('TODO: Implement endpoint')
@endpoint
@current_app_injector
def find(handler):
	pass
