"""The session api module /session endpoints."""

from flask_jwt import jwt_required, current_identity
from flask import jsonify, current_app

from src.console import console, exception_json
from src.imported.config_handler import load_config, save_config_file


@jwt_required()
def check():
	try:
		output = console('python /opt/dfn-software/camera_image_count.py')

		if re.search('[0-9]', output):
			return jsonify(output = output), 200
		else:
			raise IOError('Script not found with path: {0}'.format('camera_image_count.py'))
	except Exception as error:
		return exception_json(error), 500


@jwt_required()
def whitelist():
	try:
		# Whitelist for which config variables the user can modify
		config_whitelist = {}
		config_whitelist["camera"] = {
			"camera_exposuretime",
			"camera_fstop",
			"still_lens",
			"vid_lens",
			"vid_ser_no",
			"vid_camera",
			"camera_ser_no",
			"vid_format",
			"still_camera",
			"camera_iso"
		}

		config_whitelist["link"] = {
			"local_contact_email",
			"local_contact_name"
		}

		config_whitelist["station"] = {
			"location",
			"lat",
			"altitude",
			"hostname",
			"lon"
		}

		config_file = load_config(current_app.config['DFN_CONFIG_PATH'])
		whitelist = {}

		if not config_file:
			raise IOError('Cannot load config file with path: {0}'.format(path))

		for whitelist_category in config_whitelist:
			for conf_category in config_file:
				if whitelist_category == conf_category:
					for whitelist_field in config_whitelist[whitelist_category]:
						for conf_field in config_file[conf_category]:
							if whitelist_field == conf_field:
								if not conf_category in whitelist:
									whitelist[conf_category] = {}

								whitelist[conf_category][conf_field] = config_file[conf_category][conf_field]

		return jsonify(whitelist = whitelist), 200
	except Exception as error:
		return exception_json(error), 500


@jwt_required()
def getConfig():
	try:
		path = current_app.config['DFN_CONFIG_PATH']
		config_file = load_config(path)

		if not config_file:
			raise IOError('Cannot load config file with path: {0}'.format(path))

		return jsonify(config = config_file), 200
	except Exception as error:
		return exception_json(error), 500


@jwt_required()
def updateConfig(row):
	category = row[0]
	field = row[1]
	value = row[2]

	try:
		path = current_app.config['DFN_CONFIG_PATH']
		updated_conf_dict = load_config(path)

		oldValue = updated_conf_dict[category][field]
		updated_conf_dict[category][field] = value

		if save_config_file(path, updated_conf_dict):
			return jsonify('Overwritten {0}:{1}:{2} as {3}'.format(category, field, oldValue, value)), 200
		else:
			raise IOError('Unable to write {0}:{1}:{2} to config file'.format(category, field, value))
	except Exception as error:
		return exception_json(error), 500
