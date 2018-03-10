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
    SECRET_KEY = os.urandom(24)
    CORS_HEADERS = 'Content-Type'


class DevelopmentConfig(Config):
    """
    Dev config class. Inherits from the parent Config class.
    """
    DEBUG = True
    MAIL_SUPPRESS_SEND = True


class TestingConfig(Config):
    """
    Test config class, uses a separate database. Inherits from the parent Config class.
    """
    DEBUG = True
    TESTING = True


class ProductionConfig(Config):
    """
    Production config class. Inherits from the parent Config class.
    """
    DEBUG = False
    TESTING = False
    DATABASE_URI = "sqlite:////db/auth.db"


app_config = {
    'dev':  DevelopmentConfig,
    'test': TestingConfig,
    'prod': ProductionConfig,
}
