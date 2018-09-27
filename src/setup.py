from logging import basicConfig, getLogger
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from .database import db


def setup_config(app, args):
	if args.config == 'prod':
		from src.config.prod import Prod
		config = Prod
	elif args.config == 'prod.docker':
		from src.config.prod.docker import Docker
		config = Docker
	elif args.config == 'dev' or args.config == 'dev.remote':
		from src.config.dev.remote import Remote
		config = Remote
	elif args.config == 'dev.local':
		from src.config.dev.local import Local
		config = Local

	app.config.from_object(config)


def setup_extensions(app):
	db.init_app(app)
	CORS(app)
	JWTManager(app)


# TODO: https://fangpenlin.com/posts/2012/08/26/good-logging-practice-in-python/
# TODO: https://stackoverflow.com/questions/9857284/how-to-configure-all-loggers-in-an-application#answer-9859649
def setup_logger(app, args):
	if args.debug:
		args.backend_log_level = 'DEBUG'
		args.api_log_level = 'DEBUG'

	if args.backend_log_level is 'NOTSET':
		args.backend_log_level = app.config['BACKEND_LOG_LEVEL']
	else:
		app.config['LOG_LEVEL'] = args.backend_log_level

	if args.api_log_level is 'NOTSET':
		args.api_log_level = app.config['API_LOG_LEVEL']
	else:
		app.config['API_LOG_LEVEL'] = args.api_log_level

	if args.verbose:
		if 'DEBUG' not in (args.backend_log_level, args.api_log_level):
			raise ValueError("One of the log levels must be 'DEBUG' for --verbose to work.\n\n"
							 "Current:\n"
							 "\t--backend-log-level={}\n"
							 "\t--api-log-level={}"
							 .format(args.backend_log_level, args.api_log_level))

	app.config['VERBOSE'] = args.verbose

	basicConfig(
		level = args.backend_log_level,
		format = app.config['ROOT_FORMAT'],
		datefmt = app.config['DATE_FORMAT']
	)

	getLogger('flask_cors').setLevel('INFO')
	getLogger('flask_jwt_extended').setLevel(args.backend_log_level)
	getLogger('connexion').setLevel(args.backend_log_level)
	getLogger('connexion.operation').setLevel('INFO')
	getLogger('connexion.decorators').setLevel('ERROR')
	getLogger('connexion.apis').setLevel('INFO')
	getLogger('swagger_spec_validator').setLevel('INFO')
	getLogger('werkzeug').setLevel('ERROR')


def setup_routes(app):
	app.add_api('src/api/network/swagger.yaml')
	app.add_api('src/api/session/swagger.yaml')
	app.add_api('src/api/configfile/swagger.yaml')
	app.add_api('src/api/storage/swagger.yaml')
	app.add_api('src/api/location/swagger.yaml')
	app.add_api('src/api/camera/swagger.yaml')


def setup_additional_args(app, args):
	app.config['NO_AUTH'] = args.no_auth