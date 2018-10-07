from src.console import console
from src.wrappers import endpoint, logger


@endpoint
@logger('Checking internet adapter.')
def check(handler, log):
	log.info('Getting IP address.')
	command = "ifconfig | grep eth1 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | cut -c6-"
	ip = console(command)

	if len(ip) == 0:
		raise IOError('Unable to find IP address.')

	log.info('Checking internet connectivity.')
	output = console("ping -c 1 www.google.com")

	handler.add({ 'ip': ip, 'output': output })


# TODO: Rewrite to poll for changes.
@endpoint
@logger('Restarting internet adapter.')
def restart(handler):
	output = console("ifdown ppp0 && sleep 8 && ifup ppp0 && sleep 8 && ifconfig ppp0")
	handler.add({ 'output': output })
