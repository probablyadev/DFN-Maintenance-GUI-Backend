from re import sub
from subprocess import CalledProcessError

import src.wrappers as wrappers
from src.console import console


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.logger('Getting time status.')
@wrappers.injector
def get(handler, log):
	time = console('timedatectl status').splitlines()

	log.info('Parsing time.')
	local = time[0].split('Local time: ')[1]
	utc = time[1].split('Universal time: ')[1]
	utc = sub('UTC', '', utc)
	rtc = time[2].split('RTC time: ')[1]
	timezone = time[3].split('Time zone: ')[1].split(' ')[0]

	handler.add({
		'local': local,
		'utc': utc,
		'rtc': rtc,
		'timezone': timezone
	})


@wrappers.jwt
@wrappers.endpoint
@wrappers.stats
@wrappers.logger('Setting new timezone.')
@wrappers.injector
def put(timezone, handler):
	command = "timedatectl set-timezone {0}".format(timezone[0])

	try:
		console(command)
	except CalledProcessError as error:
		# Sometimes running the command again fixes the privilege issue.
		if 'Access denied' in error.output:
			console(command)
		else:
			raise error

	handler.set_status(204)
