#!/bin/sh
''''which python3.6 >/dev/null 2>&1 && exec python3.6 "$0" "$@" # '''
''''exec echo "Error: I can't find python3.6 anywhere."   # '''

from argh import ArghParser, arg, wrap_errors, expects_obj
from connexion import FlaskApp

from src.setup import (
	setup_config, setup_extensions,
	setup_logger, setup_routes,
	setup_additional_args)


@arg('--config',
	 choices = ['prod', 'prod.docker', 'dev', 'dev.remote', 'dev.local'],
	 default = 'prod',
	 help = 'Config file to use.')
@arg('--backend-log-level',
	 choices = ['CRITICAL', 'FATAL', 'ERROR', 'WARN', 'WARNING', 'INFO', 'DEBUG', 'NOTSET'],
	 default = 'NOTSET',
	 help = 'Logging level for the while application.')
@arg('--api-log-level',
	 choices = ['CRITICAL', 'FATAL', 'ERROR', 'WARN', 'WARNING', 'INFO', 'DEBUG', 'NOTSET'],
	 default = 'NOTSET',
	 help = 'Logging level for the frontend.')
@arg('--verbose', default = False, help = 'Enable verbose logging.')
@arg('--debug', default = False, help = "Enable debug mode logging (shortcut to setting both log levels to 'DEBUG').")
@arg('--no-auth', default = False, help = 'Disables jwt authentication - for testing only.')
@wrap_errors([ValueError])
@expects_obj
def run(args):
	connexion_app = FlaskApp(__name__)
	app = connexion_app.app

	setup_config(app, args)
	setup_extensions(app)
	setup_logger(app, args)
	setup_routes(connexion_app)
	setup_additional_args(app, args)

	app.run(host = app.config['HOST'], port = app.config['PORT'])


if __name__ == '__main__':
	parent_parser = ArghParser(description = 'Launches the DFN-Maintenance-GUI.')
	parent_parser.add_commands([run])
	parent_parser.set_default_command(run)
	parent_parser.dispatch()
