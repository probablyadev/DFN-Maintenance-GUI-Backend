from re import sub

from src.wrappers import jwt, endpoint, injector, logger
from src.console import console


__all__ = ['get', 'put']


@jwt
@logger('Getting time status.')
@endpoint
def get(handler, log):
	time = console('timedatectl status').splitlines()

	log.info('Parsing time.')
	local = time[0].split('Local time: ')[1]
	utc = time[1].split('Universal time: ')[1]
	utc = sub('UTC', '', utc)
	rtc = time[2].split('RTC time: ')[1]
	timezone = time[3].split('Time zone: ')[1].split(' ')[0]

	handler.add_to_success_response(
		local = local,
		utc = utc,
		rtc = rtc,
		timezone = timezone
	)


@jwt
@logger('Setting new timezone.')
@endpoint
@injector
def put(timezone, handler):
	console("timedatectl set-timezone {0}".format(timezone[0]))
	handler.set_status(204)
