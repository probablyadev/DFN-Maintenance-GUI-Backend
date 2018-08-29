import logging


class Config(object):
	"""Parent config class. Inherits from object."""
	# CORS.
	HEADERS = 'Content-Type'
	RESOURCES = {r"/api/*": {'origins': "*"}}
	SUPPORTS_CREDENTIALS = True

	# Logging.
	LOGGING_LEVEL = logging.INFO
	CORS_LOGGING_LEVEL = logging.INFO

	# Connexion.
	SWAGGER_JSON = False

	# SQLAlchemy.
	SQLALCHEMY_TRACK_MODIFICATIONS = True
