"""The app module, containing the app factory function."""

import logging
import connexion
from connexion.resolver import RestyResolver
from flask_jwt import JWT

from src.extensions import cors, db
from src.auth import authenticate, identity


def create_app(config):
	"""An application factory, as explained here:
	http://flask.pocoo.org/docs/patterns/appfactories/.

	:param config: The configuration object to use.
	"""
	connexion_app = connexion.FlaskApp(__name__)
	connexion_app.app.config.from_object(config)

	app = connexion_app.app

	register_extensions(app)
	register_logger(app, config)
	register_routes(connexion_app)

	app.run(host = config.HOST, port = config.PORT)


def register_extensions(app):
	"""Register Flask extensions."""
	cors.init_app(app)
	db.init_app(app)
	JWT(app, authenticate, identity)


def register_logger(app, config):
	"""Register logging handlers."""
	# Set up logging to file
	logging.basicConfig(
		filename = config.FILENAME,
		level = config.LOGGING_LEVEL,
		format = '[%(asctime)s] %(levelname)s - %(message)s',
		datefmt = '%H:%M:%S'
	)


def register_routes(app):
	"""Register swagger api endpoints."""
	app.add_api('api/network/swagger.yaml')
	app.add_api('api/session/swagger.yaml')
	app.add_api('api/configfile/swagger.yaml')
	app.add_api('api/storage/swagger.yaml')
