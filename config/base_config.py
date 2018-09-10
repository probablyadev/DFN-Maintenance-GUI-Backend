import logging


class Config(object):
	"""Parent config class. Inherits from object."""
	# Flask.
	HOST = '0.0.0.0'
	PORT = 5000

	# CORS.
	HEADERS = 'Content-Type'
	RESOURCES = {r"/api/*": {'origins': "*"}}
	SUPPORTS_CREDENTIALS = True

	# Logging.
	FILENAME = '/data0/log/gui/dfn-gui-server.log'
	LOGGING_LEVEL = logging.INFO
	CORS_LOGGING_LEVEL = logging.INFO

	# Connexion.
	SWAGGER_JSON = False

	# SQLAlchemy.
	SQLALCHEMY_TRACK_MODIFICATIONS = True

	# Console (terminal / ssh) and Command Type (prod / dev).
	USE_CONSOLE = True
	USE_PROD_COMMAND = True
