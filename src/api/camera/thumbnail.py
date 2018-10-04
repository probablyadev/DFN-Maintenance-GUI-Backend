from src.wrappers import jwt, endpoint, injector, logger
from src.console import console


__all__ = ['download', 'remove']


@jwt
@logger('TODO: Implement endpoint')
@endpoint
@injector
def download(handler):
	pass


@jwt
@logger('TODO: Implement endpoint')
@endpoint
@injector
def remove(handler):
	pass
