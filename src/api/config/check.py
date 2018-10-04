from re import search

from src.wrappers import jwt, endpoint, current_app_injector, logger
from src.console import console


@jwt
@logger('Checking config file is valid.')
@endpoint
@current_app_injector
def get(handler, log):
	output = console('python /opt/dfn-software/camera_image_count.py')

	log.info('Parsing output.')
	if search('[0-9]', output):
		handler.add_to_success_response(output)
	else:
		raise IOError('Script not found with path: {0}'.format('camera_image_count.py'))
