import os
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager

from app.config import app_config


def create_app():
    """
    Creates the flask app, sets up the config.

    Returns:
        app (obj): Represents an instance of this application.
    """
    app = Flask(__name__)
    CORS(app)
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = "login"

    # Set config
    app.config.from_object(app_config[os.getenv('APP_SETTINGS')])

    return app