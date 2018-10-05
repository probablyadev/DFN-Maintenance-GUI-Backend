from flask import jsonify, current_app
from io import StringIO
from logging import Filter, Formatter, StreamHandler, getLogger


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


class NoEmptyFilter(Filter):
	def filter(self, record):
		return True if record.getMessage() else False


class AdditionalFilter(Filter):
	def __init__(self, url):
		self.url = url.replace('/', '.')

	def filter(self, record):
		record.url = self.url
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
		def _setup_stream_handler(stream):
			handler = StreamHandler(stream = stream)

			handler.setFormatter(Formatter(
				current_app.config['API_FORMAT'],
				datefmt = current_app.config['DATE_FORMAT']))
			handler.addFilter(NoEmptyFilter())
			handler.addFilter(AdditionalFilter(name))

			return handler

		log = getLogger(name)
		stream = StringIOArray()

		log.addHandler(_setup_stream_handler(stream))

		return log, stream
