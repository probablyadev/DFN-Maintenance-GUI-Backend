"""The config file api module /configfile endpoints."""

from flask_jwt_extended import jwt_required
from flask import jsonify, current_app

from src.console import console
from src.imported.config_handler import load_config
from src.wrappers import old_endpoint


@jwt_required
@old_endpoint()
def check():
	output = console('python /opt/dfn-software/camera_image_count.py')

	if re.search('[0-9]', output):
		return jsonify(output = output), 200
	else:
		raise IOError('Script not found with path: {0}'.format('camera_image_count.py'))


@jwt_required
@old_endpoint()
def whitelist():
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
