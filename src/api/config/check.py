from re import search

import src.wrappers as wrappers
from src.console import console


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.logger('Checking config file is valid.')
@wrappers.injector
def get(handler, log):
	output = console('python /opt/dfn-software/camera_image_count.py')

	log.info('Parsing output.')
	if search('[0-9]', output):
		handler.add({ 'output': output })
	else:
		raise IOError('Script not found with path: camera_image_count.py')
