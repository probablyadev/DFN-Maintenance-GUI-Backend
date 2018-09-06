"""The network api module /internet endpoints."""

from flask import jsonify
from flask_jwt import jwt_required
from subprocess import CalledProcessError

from src.console import console
from src.wrappers import wrap_error


@jwt_required()
@wrap_error
def check():
	#ip = console("dig TXT +short o-o.myaddr.l.google.com @ns1.google.com").replace('"', '')
	command = "ifconfig | grep eth1 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | cut -c6-"
	ip = console(command)

	if len(ip) == 0:
		raise CalledProcessError(cmd = command, returncode = 1, output = "Unable to find IP address")

	output = console("ping -c 1 www.google.com")

	return jsonify(ip = ip, output = output), 200

@jwt_required()
@wrap_error
def restart():
	return jsonify(output = console("ifdown ppp0 && sleep 8 && ifup ppp0 && sleep 8 && ifconfig ppp0")), 200
