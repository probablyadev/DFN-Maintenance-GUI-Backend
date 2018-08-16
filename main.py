"""Create an application instance."""

__version__ = '0.0.0'

from flask import send_from_directory
from flask.helpers import get_debug_flag

from src.app import create_app
from src.settings import DevelopmentConfig, ProductionConfig


# 'export FLASK_DEBUG=1' if you want dev config, else =0 for prod.
# pip3 install -r requirements.txt; export FLASK_DEBUG=1; python3 main.py
CONFIG = DevelopmentConfig if get_debug_flag() else ProductionConfig

app = create_app(CONFIG)

@app.route('/<path:filename>')
def index(filename):
	return send_from_directory('../dist', 'index.html')

app.run()
