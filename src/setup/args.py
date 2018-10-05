def args(config, args):
	if args.debug:
		config['ENV']   = 'development'
		config['DEBUG'] = True

	config.setdefault('LOG_LEVEL',     args.log_level)
	config.setdefault('API_LOG_LEVEL', args.api_log_level)

	config['NO_STATS'] = args.no_stats
	config['NO_AUTH']  = args.no_auth
	config['SILENT']   = args.silent
	config['CONSOLE']  = args.no_console
	config['NO_FILE']  = args.no_file
