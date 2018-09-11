"""The network api module /vpn endpoints."""

from flask import jsonify
from flask_jwt import jwt_required
from subprocess import CalledProcessError

from src.console import console
from src.wrappers import wrap_error


@jwt_required()
@wrap_error()
def check():
	command = "ifconfig | grep tun0 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'| cut -c6-"
	ip = console(command)

	if len(ip) == 0:
		raise CalledProcessError(cmd = command, returncode = 1, output = "Unable to find VPN IP address")

	output = console("ping -c 1 10.1.16.1")

	return jsonify(ip = ip, output = output), 200

@jwt_required()
@wrap_error()
def restart():
	return jsonify(output = console("service openvpn restart && sleep 10 && ifconfig tun0")), 200
