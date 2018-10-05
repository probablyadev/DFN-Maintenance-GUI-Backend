from errno import EEXIST
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from logging import Formatter, getLogger, StreamHandler
from logging.handlers import RotatingFileHandler, TimedRotatingFileHandler
from os import makedirs

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


def setup_args(app, args):
	app.config['NO_STATS'] = args.no_stats
	app.config['NO_AUTH'] = args.no_auth

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


def setup_extensions(app):
	db.init_app(app)
	CORS(app)
	JWTManager(app)


def setup_logger(app):
	config = app.config

	logger = getLogger()
	logger.setLevel(config['LOG_LEVEL'])

	if config['SHOULD_LOG_TO_FILE']:
		try:
			makedirs(config['LOG_DIR'])
		except OSError as error:
			if error.errno is not EEXIST:
				raise

		handler = TimedRotatingFileHandler(
			'{}/normal.log'.format(config['LOG_DIR']),
			when = 'midnight',
			backupCount = 100,
			encoding = None,
			delay = 0,
			utc = True)
		handler.setFormatter(Formatter(
			config['FORMAT'],
			datefmt = config['DATE_FORMAT']))
		handler.setLevel('INFO')

		errorHandler = RotatingFileHandler(
			'{}/error.log'.format(config['LOG_DIR']),
			maxBytes = 5000,
			backupCount = 0)
		errorHandler.setLevel('ERROR')
		errorHandler.setFormatter(Formatter(
			config['FORMAT'],
			datefmt = config['ERROR_LOG_FILE_DATE_FORMAT']))

		logger.addHandler(handler)
		logger.addHandler(errorHandler)

	consoleHandler = StreamHandler()
	consoleHandler.setLevel(config['LOG_LEVEL'])
	consoleHandler.setFormatter(Formatter(
		config['FORMAT'],
		datefmt = config['DATE_FORMAT']))

	logger.addHandler(consoleHandler)

	getLogger('flask_cors').setLevel('INFO')
	getLogger('flask_jwt_extended').setLevel(config['LOG_LEVEL'])
	getLogger('connexion').setLevel(config['LOG_LEVEL'])
	getLogger('connexion.operation').setLevel('INFO')
	getLogger('connexion.decorators').setLevel('ERROR')
	getLogger('connexion.apis').setLevel('INFO')
	getLogger('swagger_spec_validator').setLevel('INFO')
	getLogger('werkzeug').setLevel('ERROR')


def setup_routes(app):
	app.add_api('src/api/camera/swagger.yaml')
	app.add_api('src/api/config/swagger.yaml')
	app.add_api('src/api/location/swagger.yaml')
	app.add_api('src/api/network/swagger.yaml')
	app.add_api('src/api/session/swagger.yaml')
	app.add_api('src/api/storage/swagger.yaml')
