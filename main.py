"""Create an application instance."""
from flask import render_template
from flask.helpers import get_debug_flag

from src.app import create_app
from src.settings import DevelopmentConfig, ProductionConfig

# 'export FLASK_APP=/path/to/main.py'
# 'export FLASK_DEBUG=1' if you want dev config.
CONFIG = DevelopmentConfig if get_debug_flag() else ProductionConfig

app = create_app(CONFIG)

@app.route("/")
def index():
    return render_template("index.html")
