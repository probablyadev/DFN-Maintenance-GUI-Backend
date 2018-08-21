"""Create an application instance."""

__version__ = '0.0.0'

from sys import argv
from flask import send_from_directory

from src.app import create_app


# DEVELOPMENT: pip3 install -r requirements.txt; python3 main.py dev

# PRODUCTION: pip3 install -r requirements.txt; python3 main.py
# or
# PRODUCTION: pip3 install -r requirements.txt; python3 main.py prod
if len(argv) > 0:
	env = argv[1]

	if env == "dev":
		from config.dev_config import DevelopmentConfig

		config = DevelopmentConfig
	elif env == "prod":
		from config.dev_config import ProductionConfig

		config = ProductionConfig
else:
	from config.dev_config import ProductionConfig

	config = ProductionConfig

app = create_app(config)


@app.route('/')
def index():
	return send_from_directory('../dist', 'index.html')


@app.route('/<filename>')
def page(filename):
	return send_from_directory('../dist', 'index.html')


@app.route('/assets/<filename>')
def assets(filename):
	return send_from_directory('../dist/assets', filename)


app.run(host = '0.0.0.0', port = 5000)
