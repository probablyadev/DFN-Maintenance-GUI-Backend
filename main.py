"""Create an application instance."""

__version__ = '0.0.0'

from sys import argv
from flask import send_from_directory
from flask.helpers import get_debug_flag

from src.app import create_app
from src.settings import DevelopmentConfig, ProductionConfig


# DEVELOPMENT: pip3 install -r requirements.txt; python3 main.py dev

# PRODUCTION: pip3 install -r requirements.txt; python3 main.py
# or
# PRODUCTION: pip3 install -r requirements.txt; python3 main.py prod
if len(argv) > 0:
	env = argv[1]

	if env == "dev":
		config = DevelopmentConfig
	elif env == "prod":
		config = ProductionConfig
else:
	config = ProductionConfig

app = create_app(config)

@app.route('/<path:filename>')
def index(filename):
	return send_from_directory('../dist', 'index.html')

app.run()
