"""The app module, containing the app factory function."""

import logging
import connexion
from connexion.resolver import RestyResolver
from flask_jwt import JWT

from src.extensions import cors, db
from src.auth import authenticate, identity


def create_app(config, args):
	"""An application factory, as explained here:
	http://flask.pocoo.org/docs/patterns/appfactories/.

	:param config: The configuration object to use.
	"""
	connexion_app = connexion.FlaskApp(__name__)
	connexion_app.app.config.from_object(config)

	app = connexion_app.app

	register_extensions(app)
	register_logger(config, args)
	register_routes(connexion_app)

	app.run(host = config.HOST, port = config.PORT)


def register_extensions(app):
	"""Register Flask extensions."""
	cors.init_app(app)
	db.init_app(app)
	JWT(app, authenticate, identity)


# TODO: https://fangpenlin.com/posts/2012/08/26/good-logging-practice-in-python/
# TODO: https://stackoverflow.com/questions/9857284/how-to-configure-all-loggers-in-an-application#answer-9859649
def register_logger(config, args):
	"""Register logging handlers."""

	if args.debug:
		level = logging.DEBUG
	else:
		level = config.LOGGING_LEVEL

	logging.basicConfig(
		level = level,
		format = '[%(asctime)s] %(levelname)s : %(name)s - %(message)s',
		datefmt = '%H:%M:%S'
	)

	logging.getLogger('flask_cors').setLevel(logging.INFO)
	logging.getLogger('flask_jwt').setLevel(logging.INFO)
	logging.getLogger('connexion').setLevel(logging.INFO)
	logging.getLogger('swagger_spec_validator').setLevel(logging.INFO)
	logging.getLogger('werkzeug').setLevel(logging.ERROR)


def register_routes(app):
	"""Register swagger api endpoints."""
	app.add_api('api/network/swagger.yaml')
	app.add_api('api/session/swagger.yaml')
	app.add_api('api/configfile/swagger.yaml')
	app.add_api('api/storage/swagger.yaml')
	app.add_api('api/location/swagger.yaml')
	app.add_api('api/camera/swagger.yaml')
