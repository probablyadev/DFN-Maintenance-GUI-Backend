from flask import render_template

from api.camera import camera_endpoints
from app.api.config_file import config_file_endpoints
from app.api.gps import gps_endpoints
from app.api.hdd import hdd_endpoints
from app.api.interval_control_test import interval_control_test_endpoints
from app.api.misc import misc_endpoints
from app.api.network import network_endpoints
from app.api.status import status_endpoints
from app.api.time import time_endpoints
from app.api.user import user_endpoints
from app.exceptions import error_handlers
from index import app

app.register_blueprint(camera_endpoints)
app.register_blueprint(config_file_endpoints)
app.register_blueprint(gps_endpoints)
app.register_blueprint(hdd_endpoints)
app.register_blueprint(interval_control_test_endpoints)
app.register_blueprint(misc_endpoints)
app.register_blueprint(network_endpoints)
app.register_blueprint(status_endpoints)
app.register_blueprint(time_endpoints)
app.register_blueprint(user_endpoints)

app.register_blueprint(error_handlers)


@app.route('/', methods = ['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods = ['GET'])
def any_root_path(path):
    return render_template('index.html')
