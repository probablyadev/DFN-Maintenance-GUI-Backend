import os
import logging


class Config(object):
	"""Parent config class. Inherits from object."""
	# Flask.
	STATIC_FOLDER = '../dist/assets'
	TEMPLATE_FOLDER = '../dist'
	STATIC_URL_PATH = 'assets'

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

	# TODO: Import prod secret key and settings from file. Until then, this key works for both prod and dev.
	# import os
	# import binascii
	# binascii.hexlify(os.urandom(128)).decode()
	SECRET_KEY = '31e40b167539305e0fed148fa4f7089b584fbf8011968fd548db340f210c1a449900c10d280da5782ff3b621a1134373bc43655574c78d4787925a4ad97956162cf4715889b19d9df18f8ae60a79d259f790bc9cace11fe6bf1b5d09fe7b93d2128e182fb084b16de04363107a0115569460587ae7ada1c32658523d13b7c4cd'

class DevelopmentConfig(Config):
	"""Dev config class. Inherits from the parent Config class."""
	# Flask.
	DEBUG = True
	TESTING = True

	# Logging.
	LOGGING_LEVEL = logging.DEBUG

	# SQLAlchemy.
	SQLALCHEMY_DATABASE_URI = "sqlite:///../db/dev.db"

class ProductionConfig(Config):
	"""Production config class. Inherits from the parent Config class."""
	# SQLAlchemy.
	SQLALCHEMY_DATABASE_URI = "sqlite:///../db/auth.db"
