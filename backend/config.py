import os

# If APP_SETTINGS has not been defined the default to production config.
if "APP_SETTINGS" not in os.environ:
    os.environ["APP_SETTINGS"] = "prod"


class Config(object):
    """
    Parent config class. Inherits from object.
    """
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SECRET_KEY = os.urandom(32)
    CORS_HEADERS = 'Content-Type'


class DevelopmentConfig(Config):
    """
    Dev config class. Inherits from the parent Config class.
    """
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///../db/dev-auth.db"


class TestingConfig(Config):
    """
    Test config class, uses a separate database. Inherits from the parent Config class.
    """
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///../db/test-auth.db"


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
