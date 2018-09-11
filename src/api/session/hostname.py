"""The session hostname api module /session/hostname endpoint."""

from flask import jsonify

from src.console import console
from src.wrappers import wrap_error


__all__ = ['hostname', 'get']


def hostname():
	return console('hostname')


@wrap_error()
def get():
	return jsonify(hostname = hostname()), 200
