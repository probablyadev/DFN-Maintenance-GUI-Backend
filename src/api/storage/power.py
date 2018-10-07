from flask import current_app
from time import sleep
from os import walk

from src.wrappers import endpoint, logger, injector
from src.console import console
from .partitions import disk_partitions
from .unmount import unmount


# TODO[BUG]: Need to disk_partitions if any drives are to be powered on / off. Currently just times out and returns the same result.
@logger('Polling for drive changes...')
@injector
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


@endpoint
def on(handler, log):
	log.info('Turning on external drives...')
	console('python /opt/dfn-software/enable_ext-hd.py')

	_poll(check_for_increase = True)

	handler.add({ 'partitions': disk_partitions() })


@endpoint
def off(handler, log):
	unmount()

	log.info('Turning off external drives...')
	console('python /opt/dfn-software/disable_ext-hd.py')

	_poll(check_for_increase = False)

	handler.add({ 'partitions': disk_partitions() })
