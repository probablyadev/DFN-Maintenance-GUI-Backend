import logging
from io import StringIO
from flask import jsonify


__all__ = ['Handler']


class NoEmptyFilter(logging.Filter):
	def filter(self, record):
		return True if record.getMessage() else False


class Handler():
	def __init__(self, name):
		self.log, self.stream = self.__setup_logger(name)
		self.response = {}
		self.error = {}
		self.statuscode = 200

	def add_to_response(self, **kwargs):
		self.statuscode = kwargs.pop('statuscode', self.statuscode)

		for key in kwargs.keys():
			self.response[key] = kwargs[key]

	def add_error_to_response(self, *args, **kwargs):
		self.statuscode = kwargs.pop('statuscode', 500)

		for arg in args:
			if isinstance(arg, dict):
				kwargs = dict(arg, **kwargs)
			else:
				self.error['output'] = arg

		for key in kwargs.keys():
			self.error[key] = kwargs[key]

	def to_json(self):
		if self.error.__len__() is 0:
			self.add_to_response(log = self.stream.getvalue())
			result = self.response
		else:
			self.add_error_to_response(log = self.stream.getvalue())
			result = self.error

		return jsonify(result), self.statuscode

	def __setup_logger(self, name):
		stream = StringIO()

		handler = logging.StreamHandler(stream = stream)
		handler.setFormatter(logging.Formatter('[%(levelname)s] %(message)s'))
		handler.addFilter(NoEmptyFilter())

		log = logging.getLogger(name)
		log.addHandler(handler)

		return log, stream
