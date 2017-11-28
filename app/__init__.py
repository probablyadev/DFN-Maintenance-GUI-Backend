import os
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

from app.config import app_config

db = ""

def create_app():
    """
    Creates the flask app, sets up the config.

    Returns:
        app (obj): Represents an instance of this application.
    """
    # Flask
    app = Flask(__name__)

    # CORS
    CORS(app)

    # Flask-login
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = "login"

    # Set config
    app.config.from_object(app_config[os.getenv('APP_SETTINGS')])

    db = SQLAlchemy(app)
    db.init_app(app)
    db.app = app
    db.create_all()

    return app