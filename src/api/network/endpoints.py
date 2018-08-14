import logging
from flask import jsonify

from src.database import User
from src.auth import verify, generate
from src.console import console
from src.command_exception import CommandError


def check_internet():
	try:
		#ip = console("ifconfig | grep eth1 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | cut -c6-")
		ip = console("dig TXT +short o-o.myaddr.l.google.com @ns1.google.com") # Public IP address.
		output = console("ping -c 1 www.google.com")

		return jsonify(ip, output), 200
	except CommandError as error:
		return jsonify(error.return_code, error.output), 500
