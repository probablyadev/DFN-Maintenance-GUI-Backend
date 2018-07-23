import os
import logging

class Config(object):
    """Parent config class. Inherits from object."""
    # Flask.
    HOST = '0.0.0.0'
    STATIC_FOLDER = '../dist'
    TEMPLATE_FOLDER = '../dist'
    STATIC_URL_PATH = ''

    # CORS.
    HEADERS = 'Content-Type'
    RESOURCES = {r"/api/*": {'origins': "*"}}
    SUPPORTS_CREDENTIALS = True

    # Logging.
    LOGGING_LEVEL = logging.INFO
    CORS_LOGGING_LEVEL = logging.INFO

    # SQLAlchemy.
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SECRET_KEY = os.urandom(32)

	# Connexion.
	SWAGGER_JSON = False


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
