"""The storage power api module /storage/power endpoints."""

from flask import current_app
from time import sleep
from os import walk

from src.wrappers import endpoint, current_app_injecter, logger, jwt
from src.console import console
from .partitions import check
from .unmount import unmount


__all__ = ['on', 'off']


# TODO[BUG]: Need to check if any drives are to be powered on / off. Currently just times out and returns the same result.
@logger('Polling for drive changes...')
@current_app_injecter()
def _poll(log, check_for_increase):
	num_to_change = len(current_app.config['DRIVES'])
	initial = len(next(walk('/sys/block'))[1])
	current = len(next(walk('/sys/block'))[1])
	time = 0
	timeout = 30
	change_detected = False

	if check_for_increase:
		expected = initial + num_to_change
	else:
		expected = initial - num_to_change

	while time < timeout and not change_detected:
		sleep(1)

		time = time + 1
		current = len(next(walk('/sys/block'))[1])

		if expected == current:
			change_detected = True

	sleep(1)
	log.info('{} drives detected.'.format(current))


@jwt
@endpoint(prefix = 'api/storage/power/on')
@current_app_injecter()
def on(handler, log):
	log.info('Turning on external drives...')
	console('python /opt/dfn-software/enable_ext-hd.py')

	_poll(check_for_increase = True)

	handler.add_to_response(partitions = check())


@jwt
@endpoint(prefix = 'api/storage/power/off')
@current_app_injecter()
def off(handler, log):
	unmount()

	log.info('Turning off external drives...')
	console('python /opt/dfn-software/disable_ext-hd.py')

	_poll(check_for_increase = False)

	handler.add_to_response(partitions = check())
