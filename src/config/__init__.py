class Config(object):
	# Flask.
	HOST = '0.0.0.0'
	PORT = 5000

	# CORS.
	HEADERS = 'Content-Type'
	RESOURCES = {r"/api/*": {'origins': "*"}}
	SUPPORTS_CREDENTIALS = True

	# Logging.
	# TODO: Setup propper logging and seperate log dirs for each day, seperate log files for info / errors.
	# FILENAME = '/data0/log/gui/dfn-gui-server.log'
	BACKEND_LOG_LEVEL = 'INFO'
	API_LOG_LEVEL = 'INFO'

	ROOT_FORMAT = '[%(asctime)s] [%(levelname)-5s] [%(name)s] %(message)s'
	API_FORMAT = '[%(levelname)s] %(message)s'

	DATE_FORMAT = '%H:%M:%S'

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
