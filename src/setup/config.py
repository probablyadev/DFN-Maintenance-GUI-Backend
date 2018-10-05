def config(config, args):
	if args.config == 'prod':
		from src.config.prod import Prod
		config_obj = Prod
	elif args.config == 'prod.docker':
		from src.config.prod.docker import Docker
		config_obj = Docker
	elif args.config == 'dev' or args.config == 'dev.remote':
		from src.config.dev.remote import Remote
		config_obj = Remote
	elif args.config == 'dev.local':
		from src.config.dev.local import Local
		config_obj = Local

	config.from_object(config_obj)
