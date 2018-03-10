import logging
from flask import Flask, render_template
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from config import ProductionConfig

flaskapp = Flask(__name__, static_folder = "./frontend/dist", template_folder = "./frontend")
flaskapp.config.from_object(ProductionConfig)

db = SQLAlchemy(flaskapp)
bcrypt = Bcrypt(flaskapp)
CORS(flaskapp, resources = {r"/api/*": {"origins": "*"}}, headers = 'Content-Type', supports_credentials = True)

# Set up logging to file
logging.basicConfig(
    filename = 'dfn-gui-server.log',
    level = logging.INFO,
    format = '[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s',
    datefmt = '%H:%M:%S'
)

# Set up logging to console
console = logging.StreamHandler()
console.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(name)-12s: %(levelname)-8s %(message)s')
console.setFormatter(formatter)

logging.getLogger('').addHandler(console)

logger = logging.getLogger(__name__)

logging.getLogger('flask_cors').level = logging.DEBUG

from backend.api.camera import camera_endpoints
#from backend.api.config_file import config_file_endpoints
from backend.api.gps import gps_endpoints
from backend.api.hdd import hdd_endpoints
from backend.api.interval_control_test import interval_control_test_endpoints
from backend.api.misc import misc_endpoints
from backend.api.network import network_endpoints
#from backend.api.status import status_endpoints
from backend.api.time import time_endpoints
from backend.api.user import user_endpoints
from backend.exceptions import error_handlers
from backend.config import ProductionConfig

flaskapp.register_blueprint(camera_endpoints)
#flaskapp.register_blueprint(config_file_endpoints)
flaskapp.register_blueprint(gps_endpoints)
flaskapp.register_blueprint(hdd_endpoints)
flaskapp.register_blueprint(interval_control_test_endpoints)
flaskapp.register_blueprint(misc_endpoints)
flaskapp.register_blueprint(network_endpoints)
#flaskapp.register_blueprint(status_endpoints)
flaskapp.register_blueprint(time_endpoints)
flaskapp.register_blueprint(user_endpoints)
flaskapp.register_blueprint(error_handlers)

@flaskapp.route('/', methods = ['GET'])
def index():
    return render_template('index.html')


@flaskapp.route('/<path:path>', methods = ['GET'])
def any_root_path(path):
    return render_template('index.html')

