import logging
from io import StringIO
from flask import jsonify, current_app


__all__ = ['Handler']


class StringIOArray(StringIO):
	def __init__(self):
		self.msg = ''
		self.log = []

	def write(self, msg):
		self.msg += msg

	def flush(self):
		self.log.append(self.msg)
		self.msg = ''

	def getvalue(self):
		return self.log


class NoEmptyFilter(logging.Filter):
	def filter(self, record):
		return True if record.getMessage() else False


class CounterFilter(logging.Filter):
	def __init__(self):
		self.count = 0

	def filter(self, record):
		record.count = self.count
		self.count += 1

		return True


# TODO: Add to response (all 3), allow for updating of dicts / create if doesnt already exist e.g. stats.time should create / update.
class Handler():
	def __init__(self, name):
		self.log, self.stream = self.__setup_logger(name)
		self.common = {}
		self.response = {}
		self.error = {}
		self.status = 200

	def add_to_success_response(self, **kwargs):
		for key in kwargs.keys():
			self.log.debug("Adding '{}' to success response".format(key))
			self.response[key] = kwargs[key]

	def add_to_error_response(self, *args, **kwargs):
		for arg in args:
			if isinstance(arg, dict):
				kwargs = dict(arg, **kwargs)
			else:
				self.error['output'] = arg

		for key in kwargs.keys():
			self.log.debug("Adding '{}' to error response".format(key))
			self.error[key] = kwargs[key]

	def add_to_common_response(self, **kwargs):
		for key in kwargs.keys():
			self.log.debug("Adding '{}' to common response".format(key))
			self.response[key] = kwargs[key]

	def set_status(self, status):
		self.log.debug("Setting response status from '{}' to '{}'".format(self.status, status))
		self.status = status

	def to_json(self):
		if self.error.__len__() is 0:
			result = self.response
		else:
			result = self.error

		self.add_to_common_response(log = self.stream.getvalue())
		result.update(self.common)

		return jsonify(result), self.status

	def __setup_logger(self, name):
		def string_handler():
			stream = StringIOArray()
			handler = logging.StreamHandler(stream = stream)

			handler.setFormatter(logging.Formatter(current_app.config['API_FORMAT']))
			handler.addFilter(NoEmptyFilter())
			handler.addFilter(CounterFilter())

			return handler, stream

		log = logging.getLogger(name)

		handler, stream = string_handler()
		log.addHandler(handler)

		return log, stream
