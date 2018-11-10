from os import environ


def args(config, args):
	config.update(
		# ARGS.
		LOG_LEVEL = args.log_level,
		API_LOG_LEVEL = args.api_log_level,
		NO_STATS = args.no_stats,
		NO_AUTH = args.no_auth,
		CONSOLE = args.console,
		NO_FILE = args.no_file,
		CONFIG_PATH = args.config_path,
		DISK_USAGE_PATH = args.disk_usage_path,
		SSH = args.ssh,
		VERBOSE = args.verbose,

		# CORS.
		CORS_METHODS = ['GET', 'POST', 'PUT', 'OPTIONS'],
		CORS_ALLOW_HEADERS = ['Access-Control-Allow-Credentials',
							  'Access-Control-Allow-Headers',
							  'Access-Control-Allow-Methods',
							  'Access-Control-Allow-Origin',
							  'Authorization',
							  'Content-Type',
							  'Accept'],
		CORS_ORIGINS = '*',

		# Logging.
		LOG_DIR = '/data0/log/gui/',

		FORMAT = '[%(asctime)s] [%(levelname)-5s] [%(name)s] %(message)s',
		API_FORMAT = '[%(levelname)-5s] %(message)s',

		DATE_FORMAT = '%H:%M:%S',
		ERROR_LOG_FILE_DATE_FORMAT = '%d:%m:%Y %H:%M:%S',

		# Connexion.
		SWAGGER_JSON = False,

		# SQLAlchemy.
		SQLALCHEMY_TRACK_MODIFICATIONS = True,

		# Storage Endpoint. Drives that can be mounted / unmounted / powered on / powered off / formatted.
		DRIVES = [
			{ 'device': '/dev/sdb1', 'mount': '/data1' },
			{ 'device': '/dev/sdc1', 'mount': '/data2' },
			{ 'device': '/dev/sdd1', 'mount': '/data3' }
		])

	if args.dev:
		_dev(config)
	else:
		_prod(config)

	if args.ssh:
		config.update(
			SSH_HOSTNAME = args.ssh.rpartition()[0],
			SSH_USER = args.ssh.rpartition()[1],
			SSH_PASSWORD = args.password
		)

	if args.verbose:
		config.update(
			LOG_LEVEL = 'DEBUG',
			API_LOG_LEVEL = 'DEBUG')



def _dev(config):
	environ['FLASK_ENV'] = 'development'

	config.update(
		SQLALCHEMY_DATABASE_URI = 'sqlite:///db/dev.db',
		JWT_SECRET_KEY = '31e40b167539305e0fed148fa4f7089b584fbf8011968fd548db340f210c1a449900c10d280da5782ff3b621a1134373bc43655574c78d4787925a4ad97956162cf4715889b19d9df18f8ae60a79d259f790bc9cace11fe6bf1b5d09fe7b93d2128e182fb084b16de04363107a0115569460587ae7ada1c32658523d13b7c4cd')


def _prod(config):
	try:
		secret = environ.get('JWT_SECRET_KEY')
	except KeyError:
		print('\033[1;31mERROR: JWT_SECRET_KEY could not be found! Export it before running in production.\033[0;0m')
		exit()

	config.update(
		JWT_SECRET_KEY = secret,
		SQLALCHEMY_DATABASE_URI = 'sqlite:///db/prod.db')
