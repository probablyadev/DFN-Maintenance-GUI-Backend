from src.wrappers import jwt, endpoint, injector, logger
from src.console import console


__all__ = ['download', 'find']


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
def find(handler):
	pass
