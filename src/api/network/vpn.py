from subprocess import CalledProcessError

from src.console import console
from src.wrappers import endpoint, logger


@endpoint
@logger('Checking VPN adapter.')
def check(handler, log):
	log.info('Getting VPN address.')
	command = "ifconfig | grep tun0 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'| cut -c6-"
	ip = console(command)

	if len(ip) == 0:
		exception = CalledProcessError(cmd = command, returncode = 1, output = "Unable to find VPN IP address")
		log.exception(exception)

		raise exception

	log.info('Checking VPN connectivity.')
	output = console("ping -c 1 10.1.16.1")

	handler.add({ 'ip': ip, 'output': output })


@endpoint
@logger('Restarting VPN adapter.')
def restart(handler):
	output = console("service openvpn restart && sleep 10 && ifconfig tun0")

	handler.add({ 'output': output })
