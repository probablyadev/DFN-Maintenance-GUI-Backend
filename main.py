"""Create an application instance."""
__version__ = '0.0.0'

from flask import render_template, send_from_directory
from flask.helpers import get_debug_flag

from src.app import create_app
from src.settings import DevelopmentConfig, ProductionConfig

# 'export FLASK_DEBUG=1' if you want dev config.
CONFIG = DevelopmentConfig if get_debug_flag() else ProductionConfig

app = create_app(CONFIG)

@app.route('/')
def index():
    return send_from_directory('../dist', 'index.html')

@app.route('/<path:path>')
def serve_page(path):
    return send_from_directory('../dist', path)

app.run()
