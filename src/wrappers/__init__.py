from src.wrappers.jwt import jwt
from src.wrappers.handler import handler
from src.wrappers.logger import logger
from src.wrappers.stats import stats
from src.wrappers.injector import injector


def endpoint(function):
	return jwt(handler(stats(injector(function))))
