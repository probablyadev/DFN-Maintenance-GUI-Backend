#!/bin/sh
''''which python3.6 >/dev/null 2>&1 && exec python3.6 "$0" "$@" # '''
''''which python3.5 >/dev/null 2>&1 && exec python3.5 "$0" "$@" # '''
''''exec echo "Error: I can't find python3.[6|5] anywhere."     # '''

from argh import ArghParser, arg, wrap_errors, expects_obj
from connexion import FlaskApp

from src.setup import (
	setup_config, setup_extensions,
	setup_logger, setup_routes,
	setup_additional_args)


# TODO: Flag to not send log to frontend (--no-log).
# TODO: Clear console on dev rebuild.
# TODO: Silent flag. If True, do not print any logs to console / file, only exceptions (also possibly errors).
# TODO: Stats flag. If True, stats will be returned to the frontend, if verbose is also true, will print stats on backend.
# Include: Time to execute, errors / warning encountered.
# Frontend: Log table (default), stats tab - if stats is not present in response then give user a message saving stats has been disabled on the server.
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
@arg('--debug',    default = False, help = "Enable debug mode logging (shortcut to setting both log levels to 'DEBUG').")
@arg('--verbose',  default = False, help = 'Enable verbose logging.')
@arg('--no-stats', default = False, help = 'Disables handler stats gathering.')
@arg('--no-auth',  default = False, help = 'Disables jwt authentication - for testing only.')
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
