from subprocess import CalledProcessError

from src.console import console
from src.wrappers import jwt, endpoint, current_app_injector, logger


@jwt
@logger('Checking VPN adapter.')
@endpoint
@current_app_injector
def check(handler, log):
	log.info('Getting VPN address.')
	command = "ifconfig | grep tun0 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'| cut -c6-"
	ip = console(command)

	if len(ip) == 0:
		raise CalledProcessError(cmd = command, returncode = 1, output = "Unable to find VPN IP address")

	log.info('Checking VPN connectivity.')
	output = console("ping -c 1 10.1.16.1")

	handler.add_to_success_response(
		ip = ip,
		output = output
	)


@jwt
@logger('Restarting VPN adapter.')
@endpoint
@current_app_injector
def restart(handler):
	handler.add_to_success_response(console("service openvpn restart && sleep 10 && ifconfig tun0"))
