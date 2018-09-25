"""The location time api module /location/time endpoints."""

from flask import jsonify
from re import sub

from src.wrappers import old_endpoint, jwt
from src.console import console


__all__ = ['get', 'put']


@jwt
@old_endpoint()
def get():
	time = console('timedatectl status').splitlines()

	local = time[0].split('Local time: ')[1]
	utc = time[1].split('Universal time: ')[1]
	utc = sub('UTC', '', utc)
	rtc = time[2].split('RTC time: ')[1]
	timezone = time[3].split('Time zone: ')[1].split(' ')[0]

	return jsonify(local = local, utc = utc, rtc = rtc, timezone = timezone), 200


@jwt
@old_endpoint()
def put(timezone):
	console("timedatectl set-timezone {0}".format(timezone[0]))
	return 204
