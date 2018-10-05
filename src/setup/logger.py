from errno import EEXIST
from logging import Formatter, getLogger, StreamHandler
from logging.handlers import RotatingFileHandler, TimedRotatingFileHandler
from os import makedirs


def logger(config):
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
