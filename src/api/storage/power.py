"""The storage power api module /storage/power endpoints."""

from flask_jwt_extended import jwt_required
from flask import jsonify, current_app
from time import sleep
from os import walk

from src.wrappers import endpoint, old_endpoint
from src.console import console
from .partitions import check
from .unmount import unmount


__all__ = ['on', 'off']


# TODO[BUG]: Need to check if any drives are to be powered on / off. Currently just times out and returns the same result.
def _poll(check_for_increase):
	num_to_change = len(current_app.config['DRIVES'])
	initial = len(next(walk('/sys/block'))[1])
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


@jwt_required
@endpoint()
def on(handler):
	handler.log.info('Turning on external drives...')
	console('python /opt/dfn-software/enable_ext-hd.py')

	handler.log.info('Polling for drive changes...')
	_poll(check_for_increase = True)

	handler.log.info('Checking disk usage...')
	partitions, load_error = check()

	handler.add_to_response(partitions = partitions)


@jwt_required
@old_endpoint()
def off():
	unmount()
	console('python /opt/dfn-software/disable_ext-hd.py')
	_poll(check_for_increase = False)

	partitions, load_error = check()

	return jsonify(partitions = partitions, load_error = load_error), 200
