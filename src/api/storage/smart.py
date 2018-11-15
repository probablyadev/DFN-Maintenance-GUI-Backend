from time import sleep

import src.wrappers as wrappers
from src.console import console
from .partitions import disk_partitions


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.injector
def get(handler, log):
	partitions = disk_partitions()
	devices = []

	log.info('Starting smart tests.')
	for partition in partitions:
		console('smartctl -X {}'.format(partition['device']))
		console('smartctl -t short {}'.format(partition['device']))
		devices.append(partition['device'])

	log.info('Waiting for smart test completion (2 minutes).')
	sleep(120)

	partitions = disk_partitions()

	log.info('Checking smart test results.')
	for partition in partitions:
		if partition['device'] in devices:
			result = console('smartctl -a {}'.format(partition['device']))

			if 'No Errors Logged' in result:
				partition['smart'] = 'Passed'
			else:
				partition['smart'] = 'Failed'

	handler.add({ 'partitions': partitions })

