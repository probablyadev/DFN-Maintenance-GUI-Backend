"""The config file config api module /configfile/config endpoints."""

from flask_jwt_extended import jwt_required
from flask import jsonify, current_app

from src.imported.config_handler import load_config, save_config_file
from src.wrappers import old_endpoint
from logging import getLogger


log = getLogger(__name__)


@jwt_required
@old_endpoint()
def get():
	path = current_app.config['DFN_CONFIG_PATH']
	config_file = load_config(path)

	if not config_file:
		raise IOError('Cannot load config file with path: {0}'.format(path))

	return jsonify(config = config_file), 200


@jwt_required
@old_endpoint()
def put(row):
	category = row[0]
	field = row[1]
	value = row[2]

	path = current_app.config['DFN_CONFIG_PATH']
	updated_conf_dict = load_config(path)

	oldValue = updated_conf_dict[category][field]
	updated_conf_dict[category][field] = value

	if save_config_file(path, updated_conf_dict):
		return jsonify('Overwritten {0}:{1}:{2} as {3}'.format(category, field, oldValue, value)), 200
	else:
		raise IOError('Unable to write {0}:{1}:{2} to config file'.format(category, field, value))
