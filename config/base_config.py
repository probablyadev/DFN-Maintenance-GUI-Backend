import logging


class Config(object):
	"""Parent config class. Inherits from object."""
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
	LOGGING_LEVEL = logging.INFO
	CORS_LOGGING_LEVEL = logging.INFO

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

	# Storage Endpoint. Modify means the device can be mounted / unmounted / powered on / powered off / formatted.
	DRIVES_TO_CHECK = [
		{ 'device': '/dev/sda', 'mount': '/', 'modify': False },
		{ 'device': '/dev/sda', 'mount': '/data0', 'modify': False },
		{ 'device': '/dev/sdb1', 'mount': '/data1', 'modify': True },
		{ 'device': '/dev/sdc1', 'mount': '/data2', 'modify': True },
		{ 'device': '/dev/sdd1', 'mount': '/data3', 'modify': True }
	]
