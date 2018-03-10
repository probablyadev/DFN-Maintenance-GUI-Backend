import logging
import os

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from config import app_config

config = app_config[os.getenv('APP_SETTINGS')]

flaskapp = Flask(__name__)
flaskapp.config.from_object(config)

db = SQLAlchemy(flaskapp)
from model import User

db.create_all()

CORS(flaskapp, resources = {r"/api/*": {"origins": "*"}}, headers = 'Content-Type', supports_credentials = True)

# Set up logging to file
logging.basicConfig(
    filename = 'dfn-gui-server.log',
    level = config.LOGGING_LEVEL,
    format = '[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s',
    datefmt = '%H:%M:%S'
)

# Set up logging to console
console = logging.StreamHandler()
console.setLevel(config.LOGGING_LEVEL)

formatter = logging.Formatter('%(name)-12s: %(levelname)-8s %(message)s')
console.setFormatter(formatter)

logging.getLogger('').addHandler(console)

logger = logging.getLogger(__name__)

logging.getLogger('flask_cors').level = config.LOGGING_LEVEL

from backend.api.camera import camera_endpoints
# from backend.api.config_file import config_file_endpoints
from backend.api.gps import gps_endpoints
from backend.api.hdd import hdd_endpoints
from backend.api.interval_control_test import interval_control_test_endpoints
from backend.api.misc import misc_endpoints
from backend.api.network import network_endpoints
# from backend.api.status import status_endpoints
from backend.api.time import time_endpoints
from backend.api.user import user_endpoints
from backend.exceptions import error_handlers
from backend.config import ProductionConfig

flaskapp.register_blueprint(camera_endpoints)
# flaskapp.register_blueprint(config_file_endpoints)
flaskapp.register_blueprint(gps_endpoints)
flaskapp.register_blueprint(hdd_endpoints)
flaskapp.register_blueprint(interval_control_test_endpoints)
flaskapp.register_blueprint(misc_endpoints)
flaskapp.register_blueprint(network_endpoints)
# flaskapp.register_blueprint(status_endpoints)
flaskapp.register_blueprint(time_endpoints)
flaskapp.register_blueprint(user_endpoints)
flaskapp.register_blueprint(error_handlers)

# Let's ensure there is a default User for use in this example
if not db.session.query(User).filter_by(email = 'admin@dfn.com').count():
    db.session.add(User(email = 'admin@dfn.com', password = 'desertfireballnetwork'))
    db.session.commit()


@flaskapp.teardown_request
def teardown(exception = None):
    if exception:
        db.session.rollback()
    else:
        db.session.commit()
