from errno import EEXIST
from logging import Formatter, getLogger, StreamHandler
from logging.handlers import RotatingFileHandler, TimedRotatingFileHandler
from os import makedirs


def logger(config):
	logger = getLogger()
	logger.setLevel(config['LOG_LEVEL'])

	if not config['SILENT']:
		_console_handler(config, logger)

	if config['SHOULD_LOG_TO_FILE']:
		_file_handlers(config, logger)

	_lib_log_levels(config)


def _console_handler(config, logger):
	handler = StreamHandler()
	handler.setFormatter(Formatter(
		config['FORMAT'],
		datefmt = config['DATE_FORMAT']))
	handler.setLevel(config['LOG_LEVEL'])

	logger.addHandler(handler)


def _file_handlers(config, logger):
	try:
		makedirs(config['LOG_DIR'])
	except OSError as error:
		if error.errno is not EEXIST:
			raise

	logger.addHandler(_normal_file_handler(config))
	logger.addHandler(_error_file_handler(config))


def _normal_file_handler(config):
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

	return handler


def _error_file_handler(config):
	handler = RotatingFileHandler(
		'{}/error.log'.format(config['LOG_DIR']),
		maxBytes = 5000,
		backupCount = 0)
	handler.setFormatter(Formatter(
		config['FORMAT'],
		datefmt = config['ERROR_LOG_FILE_DATE_FORMAT']))
	handler.setLevel('ERROR')

	return handler


def _lib_log_levels(config):
	getLogger('flask_cors').setLevel('INFO')
	getLogger('flask_jwt_extended').setLevel(config['LOG_LEVEL'])
	getLogger('connexion').setLevel(config['LOG_LEVEL'])
	getLogger('connexion.operation').setLevel('INFO')
	getLogger('connexion.decorators').setLevel('ERROR')
	getLogger('connexion.apis').setLevel('INFO')
	getLogger('swagger_spec_validator').setLevel('INFO')
	getLogger('werkzeug').setLevel('ERROR')
