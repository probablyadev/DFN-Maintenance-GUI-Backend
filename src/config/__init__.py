class Config(object):
	# Flask.
	HOST = '0.0.0.0'
	PORT = 5000

	# CORS.
	HEADERS = 'Content-Type'
	RESOURCES = {r"/api/*": {'origins': "*"}}
	SUPPORTS_CREDENTIALS = True

	# Logging.
	SHOULD_LOG_TO_FILE = True
	LOG_DIR = '/data0/log/gui/'

	LOG_LEVEL = 'INFO'
	API_LOG_LEVEL = 'INFO'

	FORMAT = '[%(asctime)s] [%(levelname)-5s] [%(name)s] %(message)s'
	API_FORMAT = '[%(levelname)-5s] %(message)s'

	DATE_FORMAT = '%H:%M:%S'
	ERROR_LOG_FILE_DATE_FORMAT = '%Y:%M:%D %H:%M:%S'

	# Connexion.
	SWAGGER_JSON = False

	# SQLAlchemy.
	SQLALCHEMY_TRACK_MODIFICATIONS = True

	# Paths.
	DFN_CONFIG_PATH = '/opt/dfn-software/dfnstation.cfg'
	DFN_DISK_USAGE_PATH = '/tmp/dfn_disk_usage'

	# Console (terminal / ssh) and Command Type (prod / dev).
	USE_CONSOLE = True
	USE_DEV_COMMAND = False

	# Storage Endpoint. Drives that can be mounted / unmounted / powered on / powered off / formatted.
	DRIVES = [
		{ 'device': '/dev/sdb1', 'mount': '/data1' },
		{ 'device': '/dev/sdc1', 'mount': '/data2' },
		{ 'device': '/dev/sdd1', 'mount': '/data3' }
	]
