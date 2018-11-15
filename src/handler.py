from datetime import datetime
from flask import jsonify, current_app
from io import StringIO
from json_log_formatter import JSONFormatter, BUILTIN_ATTRS
from logging import StreamHandler, getLogger

from src.helpers import deepupdate


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
			extra['time'] = datetime.now().strftime(current_app.config['DATE_FORMAT'])

		if record.exc_info:
			extra['exc_info'] = self.formatException(record.exc_info)

		for item in record.__dict__:
			if item not in BUILTIN_ATTRS:
				extra[item] = record.__dict__[item]

		return extra


class Handler():
	def __init__(self, name):
		self.log, self.stream = self.__setup_logger(name)
		self.response = {}
		self.status = 200

	def add(self, entry):
		deepupdate(self.response, entry)

	def set_status(self, status):
		self.status = status

	def to_json(self):
		self.add({ 'log': self.stream.getvalue() })

		return jsonify(self.response), self.status

	def __setup_logger(self, name):
		log = getLogger(name)
		stream = StreamArray()

		handler = CustomStreamHandler(stream = stream)
		handler.setFormatter(CustomJSONFormatter(current_app.config['API_FORMAT']))

		log.addHandler(handler)

		return log, stream
