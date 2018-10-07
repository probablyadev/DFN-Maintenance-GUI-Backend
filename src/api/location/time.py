from re import sub

from src.console import console
from src.wrappers import endpoint, logger


@endpoint
@logger('Getting time status.')
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


@endpoint
@logger('Setting new timezone.')
def put(timezone, handler):
	console("timedatectl set-timezone {0}".format(timezone[0]))
	handler.status(204)
