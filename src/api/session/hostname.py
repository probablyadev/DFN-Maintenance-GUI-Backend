"""The session hostname api module /session/hostname endpoint."""

from flask import jsonify

from src.console import console
from src.wrappers import old_endpoint


__all__ = ['hostname', 'get']


def hostname():
	return console('hostname')


@old_endpoint()
def get():
	return jsonify(hostname = hostname()), 200
