def args(config, args):
	config['NO_STATS'] = args.no_stats
	config['NO_AUTH'] = args.no_auth

	if args.debug:
		args.backend_log_level = 'DEBUG'
		args.api_log_level = 'DEBUG'

	if args.backend_log_level is 'NOTSET':
		args.backend_log_level = config['BACKEND_LOG_LEVEL']
	else:
		config['LOG_LEVEL'] = args.backend_log_level

	if args.api_log_level is 'NOTSET':
		args.api_log_level = config['API_LOG_LEVEL']
	else:
		config['API_LOG_LEVEL'] = args.api_log_level

	if args.verbose:
		if 'DEBUG' not in (args.backend_log_level, args.api_log_level):
			raise ValueError("One of the log levels must be 'DEBUG' for --verbose to work.\n\n"
							 "Current:\n"
							 "\t--backend-log-level={}\n"
							 "\t--api-log-level={}"
							 .format(args.backend_log_level, args.api_log_level))

	config['VERBOSE'] = args.verbose
	config['SILENT'] = args.silent
