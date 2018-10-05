#!/bin/sh
''''which python3.6 >/dev/null 2>&1 && exec python3.6 "$0" "$@" # '''
''''which python3.5 >/dev/null 2>&1 && exec python3.5 "$0" "$@" # '''
''''exec echo "Error: I can't find python3.[6|5] anywhere."     # '''

import src.setup as setup

from argh import ArghParser, arg, wrap_errors, expects_obj
from connexion import FlaskApp


# TODO: reduce use of config files (if possible).
# TODO: Flag to not send log to frontend (--no-log).
# TODO: Clear console on dev rebuild.
# TODO: Stats (Frontend) Log table (default), stats tab - if stats is not present in response then give user a message saving stats has been disabled on the server.
@arg('--config',
	 choices = ['prod', 'prod.docker', 'dev', 'dev.remote', 'dev.local'],
	 default = 'prod',
	 help = 'Config file to use.')
@arg('--log-level',
	 choices = ['CRITICAL', 'FATAL', 'ERROR', 'WARN', 'WARNING', 'INFO', 'DEBUG', 'NOTSET'],
	 default = 'INFO',
	 help = 'Logging level for the whole application.')
@arg('--api-log-level',
	 choices = ['CRITICAL', 'FATAL', 'ERROR', 'WARN', 'WARNING', 'INFO', 'DEBUG', 'NOTSET'],
	 default = 'INFO',
	 help = 'Logging level for the logs sent to the frontend.')
@arg('--debug',    default = False, help = 'Enable Flask debug mode.')
@arg('--console',  default = False, help = 'Enable logging to console.')
@arg('--no-file',  default = False, help = 'Disable logging to file.')
@arg('--no-stats', default = False, help = 'Disables handler stats gathering.')
@arg('--no-auth',  default = False, help = 'Disables jwt authentication - for testing only.')
@wrap_errors([ValueError, OSError])
@expects_obj
def run(args):
	connexion_app = FlaskApp(__name__)
	flask_app = connexion_app.app
	config = flask_app.config

	setup.config(config, args)
	setup.args(config, args)
	setup.extensions(flask_app)
	setup.logger(config)
	setup.routes(connexion_app)

	flask_app.run(host = config['HOST'], port = config['PORT'])


if __name__ == '__main__':
	parent_parser = ArghParser(description = 'Launches the DFN-Maintenance-GUI.')
	parent_parser.add_commands([run])
	parent_parser.set_default_command(run)
	parent_parser.dispatch()
