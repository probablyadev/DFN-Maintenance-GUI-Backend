from logging import basicConfig, getLogger, DEBUG, INFO, ERROR
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from .database import db


def setup_config(app, args):
	"""
	if '_' in args.config:
		config = ''

		# E.g.: dev.local_test -> ['dev', 'local_test'] -> ['local', 'test'] -> ['Local', 'Test'] -> LocalTest
		words = args.config.split('.')[-1:][0].split('_')

		for word in words:
			config = '{0}{1}'.format(config, word.capitalize())
	else:
		# E.g.: dev.remote -> ['dev', 'remote'] -> ['remote'] -> remote -> Remote
		config = args.config.split('.')[-1:][0].capitalize()

	config = getattr(import_module('src.config.{0}'.format(args.config)), config)
	config = app.config.from_object(config)
	"""

	if 'dev.remote' in args.config:
		from src.config.dev.remote import Remote
		config = Remote
	elif 'dev.local' in args.config:
		from src.config.dev.local import Local
		config = Local
	elif 'prod.docker' in args.config:
		from src.config.prod.docker import Docker
		config = Docker
	else:
		from src.config.prod import Prod
		config = Prod

	app.config.from_object(config)

	return config


def setup_extensions(app):
	db.init_app(app)

	CORS(app)
	JWTManager(app)


# TODO: https://fangpenlin.com/posts/2012/08/26/good-logging-practice-in-python/
# TODO: https://stackoverflow.com/questions/9857284/how-to-configure-all-loggers-in-an-application#answer-9859649
def setup_logger(app, args):
	if args.debug:
		level = DEBUG
	else:
		level = app.config.LOGGING_LEVEL

	basicConfig(
		level = level,
		format = '[%(asctime)s] [%(levelname)s:%(name)s] %(message)s',
		datefmt = '%H:%M:%S'
	)

	getLogger('flask_cors').setLevel(INFO)
	getLogger('flask_jwt_extended').setLevel(level)
	getLogger('connexion').setLevel(level)
	getLogger('connexion.operation').setLevel(INFO)
	getLogger('connexion.apis').setLevel(INFO)
	getLogger('swagger_spec_validator').setLevel(INFO)
	getLogger('werkzeug').setLevel(ERROR)


def setup_routes(app):
	app.add_api('src/api/network/swagger.yaml')
	app.add_api('src/api/session/swagger.yaml')
	app.add_api('src/api/configfile/swagger.yaml')
	app.add_api('src/api/storage/swagger.yaml')
	app.add_api('src/api/location/swagger.yaml')
	app.add_api('src/api/camera/swagger.yaml')
