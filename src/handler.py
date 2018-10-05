from datetime import datetime
from flask import jsonify, current_app
from io import StringIO
from json_log_formatter import JSONFormatter
from logging import StreamHandler, getLogger


class StreamArray(StringIO):
	def __init__(self):
		self.log = []
		self.entry = {}

	def write(self, msg):
		self.entry = msg

	def flush(self):
		self.log.append(self.entry)

	def getvalue(self):
		return self.log


class CustomStreamHandler(StreamHandler):
	def __init__(self, stream = None):
		super().__init__(stream)

	def emit(self, record):
		try:
			msg = self.format(record)
			stream = self.stream
			stream.write(msg)
			self.flush()
		except Exception:
			self.handleError(record)


class CustomJSONFormatter(JSONFormatter):
	def to_json(self, record):
		return record

	def json_record(self, message, extra, record):
		extra['message'] = message
		extra['level'] = record.__dict__['levelname']

		if 'time' not in extra:
			extra['time'] = datetime.utcnow().strftime(current_app.config['DATE_FORMAT'])

		if record.exc_info:
			extra['exc_info'] = self.formatException(record.exc_info)

		return extra


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
		def _setup_handler(stream):
			handler = CustomStreamHandler(stream = stream)
			handler.setFormatter(CustomJSONFormatter(current_app.config['API_FORMAT']))

			return handler

		log = getLogger(name)
		stream = StreamArray()

		log.addHandler(_setup_handler(stream))

		return log, stream
