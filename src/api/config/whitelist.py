from src.imported.config_handler import load_config
from src.wrappers import endpoint, logger


@endpoint
@logger('Retrieving config file whitelist.')
def get(handler, log, config):
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

	log.debug('DFN_CONFIG_PATH: {}'.format(config.dfn_config_path))
	log.info('Loading config.')

	config_file = load_config(config.dfn_config_path)
	whitelist = {}

	log.info('Checking config file.')

	if not config_file:
		raise IOError('Cannot load config file with path: {0}'.format(config.dfn_config_path))

	for whitelist_category in config_whitelist:
		for conf_category in config_file:
			if whitelist_category == conf_category:
				for whitelist_field in config_whitelist[whitelist_category]:
					for conf_field in config_file[conf_category]:
						if whitelist_field == conf_field:
							if not conf_category in whitelist:
								whitelist[conf_category] = {}

							whitelist[conf_category][conf_field] = config_file[conf_category][conf_field]

	handler.add_to_success_response(whitelist = whitelist)
