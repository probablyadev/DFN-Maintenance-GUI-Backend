"""The config api module."""

from src.imported.config_handler import load_config, save_config_file
from src.wrappers import endpoint, logger


@endpoint
@logger('Retrieving config file.')
def get(handler, log, config):
	log.debug('CONFIG_PATH: {}'.format(config.dfn_config_path))
	log.info('Loading config.')

	config_file = load_config(config.dfn_config_path)

	log.info('Checking config file.')

	if not config_file:
		raise IOError('Cannot load config file with path: {0}'.format(config.dfn_config_path))

	handler.add_to_success_response(config = config_file)


@endpoint
@logger('Updating config file entry.')
def put(row, handler, log, config):
	log.info('Parsing row parameter.')

	category = row[0]
	field = row[1]
	value = row[2]

	log.debug('CONFIG_PATH: {}'.format(config.dfn_config_path))
	log.info('Loading config.')

	updated_conf_dict = load_config(config.dfn_config_path)

	oldValue = updated_conf_dict[category][field]
	updated_conf_dict[category][field] = value

	log.info('Saving config file.')

	if save_config_file(config.dfn_config_path, updated_conf_dict):
		handler.add_to_success_response('Overwritten {0}:{1}:{2} as {3}'.format(category, field, oldValue, value))
		handler.set_status(204)
	else:
		raise IOError('Unable to write {0}:{1}:{2} to config file'.format(category, field, value))
