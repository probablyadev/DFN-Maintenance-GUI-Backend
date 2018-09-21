#!/usr/bin/python3

from argh import ArghParser, arg, wrap_errors, expects_obj
from connexion import FlaskApp

from src.setup import setup_config, setup_extensions, setup_logger, setup_routes


# TODO: --level DEBUG. --debug is for displaying absolutely all logs.
@arg('--config', default = 'prod', help = 'Config file to use: prod.[docker] or dev.[local|remote]')
@arg('--debug', default = False, help = 'Debug level logging.')
@wrap_errors([Exception])
@expects_obj
def run(args):
	connexion_app = FlaskApp(__name__)
	app = connexion_app.app

	config = setup_config(app, args)
	setup_extensions(app)
	setup_logger(app, args)
	setup_routes(connexion_app)

	app.run(host = config.HOST, port = config.PORT)


if __name__ == '__main__':
	parent_parser = ArghParser(description = 'Launches the DFN-Maintenance-GUI.')
	parent_parser.add_commands([run])
	parent_parser.set_default_command(run)
	parent_parser.dispatch()
