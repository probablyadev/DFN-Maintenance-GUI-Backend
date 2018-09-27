"""The location gps api module /location/gps endpoints."""

from src.wrappers import jwt, endpoint, current_app_injecter
from src.console import console


__all__ = ['get']


def coordinates(initial, direction):
	initial = initial.replace('.', '')
	coordinate = '-' if direction in {'S', 'W'} else ''

	return '{0}{1}.{2}'.format(coordinate, initial[:-6], initial[-6:])


@jwt
@endpoint()
@current_app_injecter()
def get(handler, log):
	log.info('Getting GPS status.')
	output = console(
		'python /opt/dfn-software/leostick_get_status.py -g',
		'echo GPGGA,080112.000,3346.4614,S,15106.8787,E,0,00,99.0,067.59,M,21.9,M,,,').split(',')

	log.info('Parsing GPS output.')
	if len(output) is not 16:
		raise IOError('GPS offline')

	lock = 'Locked' if output[6] is '1' else 'No lock'
	satellites = output[7].strip('0') or '0'
	latitude = coordinates(output[2], output[3])
	longitude = coordinates(output[4], output[5])
	altitude = output[9].strip('0') or '0'

	handler.add_to_response(
		lock = lock,
		satellites = satellites,
		latitude = latitude,
		longitude = longitude,
		altitude = altitude
	)
