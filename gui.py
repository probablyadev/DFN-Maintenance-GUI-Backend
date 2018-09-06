#!/usr/bin/python3.6

"""Create an application instance."""

from argh import ArghParser, arg, wrap_errors, expects_obj
from flask import send_from_directory

from src.app import create_app


@arg('--docker', default = False, help = 'Use the Docker config.')
@arg('--dev', default = False, help = 'Use the development config.')
@wrap_errors([Exception])
@expects_obj
def run(args):
	if args.dev:
		from config.dev_config import DevelopmentConfig
		config = DevelopmentConfig
	elif args.docker:
		from config.docker import DockerProductionConfig
		config = DockerProductionConfig
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


if __name__ == '__main__':
	"""
	Entry-point function.
	"""
	parent_parser = ArghParser(description = 'Launches the DFN-Maintenance-GUI.')
	parent_parser.add_commands([run])
	parent_parser.set_default_command(run)
	parent_parser.dispatch()
