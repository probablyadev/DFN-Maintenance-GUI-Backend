"""The network api module /vpn endpoints."""

from flask import jsonify
from subprocess import CalledProcessError

from src.database import User
from src.auth import verify, generate
from src.console import console, toJson


def check():
	try:
		command = "ifconfig | grep tun0 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'| cut -c6-"
		ip = console(command)

		if len(ip) == 0:
			raise CalledProcessError(cmd = command, returncode = 1, output = "Unable to find VPN IP address")

		output = console("ping -c 1 10.1.16.1")

		return jsonify(ip = ip, output = output), 200
	except CalledProcessError as error:
		return toJson(error), 500

def restart():
	try:
		return jsonify(output = console("service openvpn restart && sleep 10 && ifconfig tun0")), 200
	except CalledProcessError as error:
		return toJson(error), 500
