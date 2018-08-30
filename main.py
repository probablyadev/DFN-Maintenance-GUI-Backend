"""Create an application instance."""

from sys import argv
from flask import send_from_directory

from src.app import create_app


# TODO: Write help documentation and help command.
if len(argv) > 0:
	env = argv[1]

	if env == 'dev':
		from config.dev_config import DevelopmentConfig
		config = DevelopmentConfig
	elif env == 'prod':
		if len(argv) >= 2 and argv[2] == 'docker':
			from config.docker import DockerProductionConfig
			config = DockerProductionConfig
		else:
			from config.base_prod_config import ProductionConfig
			config = ProductionConfig
else:
	from config.base_prod_config import ProductionConfig
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
