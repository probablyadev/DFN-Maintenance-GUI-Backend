#!/bin/sh
''''which python3.6 >/dev/null 2>&1 && exec python3.6 "$0" "$@" # '''
''''which python3.5 >/dev/null 2>&1 && exec python3.5 "$0" "$@" # '''
''''exec echo "Error: I can't find python3.[6|5] anywhere."     # '''

from argh import ArghParser, arg, wrap_errors, expects_obj
from connexion import FlaskApp

import src.setup as setup


log_levels = ['CRITICAL', 'FATAL', 'ERROR', 'WARN', 'WARNING', 'INFO', 'DEBUG', 'NOTSET']


# TODO: Clear console on dev rebuild.
# TODO: Stats (Frontend) Log table (default), stats tab - if stats is not present in response then give user a message saving stats has been disabled on the server.
@arg('--dev',      default = False,     help = 'Enable Flask development mode.')
@arg('--console',  default = False,     help = 'Enable logging to console.')
@arg('--no-file',  default = False,     help = 'Disable logging to file.')
@arg('--no-stats', default = False,     help = 'Disables handler stats gathering.')
@arg('--no-auth',  default = False,     help = 'Disables jwt authentication.')
@arg('--host',     default = '0.0.0.0', help = 'IP to serve on.')
@arg('--port',     default = 5000,      help = 'Port to serve on.')
@arg('--ssh',      default = None,      help = 'Use the SSH console (rather than the local console). In the format user@host')
@arg('--password', default = None,      help = 'Password to use with SSH console.')
@arg('-v', '--verbose', default = False, help = 'Enable verbose logging. Sets the log levels to DEBUG and logs more in depth information.')
@arg('--config-path',     default = '/opt/dfn-software/dfnstation.cfg', help = 'Path to the dfnstation.cfg file.')
@arg('--disk-usage-path', default = '/tmp/dfn_disk_usage',              help = 'Path to the dfn_disk_usage file.')
@arg('--log-level',
	 choices = log_levels,
	 default = 'INFO',
	 help = 'Logging level for the whole application.')
@arg('--api-log-level',
	 choices = log_levels,
	 default = 'INFO',
	 help = 'Logging level for the logs sent to the frontend.')
@wrap_errors([ValueError, OSError, KeyError])
@expects_obj
def run(args):
	connexion_app = FlaskApp(__name__)
	flask_app = connexion_app.app
	config = flask_app.config

	setup.args(config, args)
	setup.extensions(flask_app)
	setup.logger(config)
	setup.routes(connexion_app)

	flask_app.run(
		host = args.host,
		port = args.port)


if __name__ == '__main__':
	parent_parser = ArghParser(description = 'Launches the DFN-Maintenance-GUI.')
	parent_parser.add_commands([run])
	parent_parser.set_default_command(run)
	parent_parser.dispatch()
