from src.console import console
from src.wrappers import endpoint, logger


def coordinates(initial, direction):
	initial = initial.replace('.', '')
	coordinate = '-' if direction in {'S', 'W'} else ''

	return '{0}{1}.{2}'.format(coordinate, initial[:-6], initial[-6:])


@endpoint
@logger('Getting GPS status.')
def get(handler, log):
	output = console('python /opt/dfn-software/leostick_get_status.py -g').split(',')

	log.info('Parsing GPS output.')
	if len(output) is not 16:
		raise IOError('GPS offline.')

	lock = 'Locked' if output[6] is '1' else 'No lock'
	satellites = output[7].strip('0') or '0'
	latitude = coordinates(output[2], output[3])
	longitude = coordinates(output[4], output[5])
	altitude = output[9].strip('0') or '0'

	handler.add({
		'lock': lock,
		'satellites': satellites,
		'latitude': latitude,
		'longitude': longitude,
		'altitude': altitude
	})
