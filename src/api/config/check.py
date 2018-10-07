from re import search

from src.console import console
from src.wrappers import endpoint, logger


@endpoint
@logger('Checking config file is valid.')
def get(handler, log):
	output = console('python /opt/dfn-software/camera_image_count.py')

	log.info('Parsing output.')
	if search('[0-9]', output):
		handler.add({ 'output': output })
	else:
		raise IOError('Script not found with path: camera_image_count.py')
