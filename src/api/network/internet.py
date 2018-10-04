from subprocess import CalledProcessError

from src.console import console
from src.wrappers import jwt, endpoint, current_app_injecter, logger


@jwt
@logger('Checking internet adapter.')
@endpoint()
@current_app_injecter()
def check(handler, log):
	log.info('Getting IP address.')
	#ip = console("dig TXT +short o-o.myaddr.l.google.com @ns1.google.com").replace('"', '')
	command = "ifconfig | grep eth1 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | cut -c6-"
	ip = console(command)

	if len(ip) == 0:
		raise CalledProcessError(cmd = command, returncode = 1, output = "Unable to find IP address")

	log.info('Checking internet connectivity.')
	output = console("ping -c 1 www.google.com")

	handler.add_to_success_response(
		ip = ip,
		output = output
	)


@jwt
@logger('Restarting internet adapter.')
@endpoint()
@current_app_injecter()
def restart(handler):
	handler.add_to_success_response(console("ifdown ppp0 && sleep 8 && ifup ppp0 && sleep 8 && ifconfig ppp0"))
