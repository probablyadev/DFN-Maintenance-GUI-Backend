"""The config check api module /config/check endpoints."""

from re import search

from src.console import console
from src.wrappers import jwt, endpoint, current_app_injecter


@jwt
@endpoint()
@current_app_injecter()
def get(handler, log):
	output = console('python /opt/dfn-software/camera_image_count.py')

	log.info('Parsing output.')
	if search('[0-9]', output):
		handler.add_to_response(output)
	else:
		raise IOError('Script not found with path: {0}'.format('camera_image_count.py'))
