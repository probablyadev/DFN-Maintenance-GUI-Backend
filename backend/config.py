import os
import logging

class Config(object):
    """
    Parent config class. Inherits from object.
    """
    DEBUG = False
    LOGGING_LEVEL = logging.INFO
    CORS_LOGGING_LEVEL = logging.INFO
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SECRET_KEY = os.urandom(32)
    CORS_HEADERS = 'Content-Type'


class DevelopmentConfig(Config):
    """
    Dev config class. Inherits from the parent Config class.
    """
    DEBUG = True
    LOGGING_LEVEL = logging.DEBUG
    SQLALCHEMY_DATABASE_URI = "sqlite:///../db/dev.db"


class TestingConfig(Config):
    """
    Test config class, uses a separate database. Inherits from the parent Config class.
    """
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///../db/test.db"


class ProductionConfig(Config):
    """
    Production config class. Inherits from the parent Config class.
    """
    SQLALCHEMY_DATABASE_URI = "sqlite:///../db/auth.db"


app_config = {
    'dev':  DevelopmentConfig,
    'test': TestingConfig,
    'prod': ProductionConfig,
}
