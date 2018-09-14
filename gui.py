#!/usr/bin/python3

"""Create an application instance."""

from argh import ArghParser, arg, wrap_errors, expects_obj

from src.app import create_app


@arg('--docker', default = False, help = 'Use the docker config.')
@arg('--dev', default = False, help = 'Use the development config.')
@arg('--debug', default = False, help = 'Debug logging.')
@wrap_errors([Exception])
@expects_obj
def run(args):
	if args.dev:
		from config.dev_config import DevelopmentConfig
		config = DevelopmentConfig
	elif args.docker:
		from config.docker import DockerProductionConfig
		config = DockerProductionConfig
	else:
		from config.base_prod_config import ProductionConfig
		config = ProductionConfig

	create_app(config, args)


if __name__ == '__main__':
	"""
	Entry-point function.
	"""
	parent_parser = ArghParser(description = 'Launches the DFN-Maintenance-GUI.')
	parent_parser.add_commands([run])
	parent_parser.set_default_command(run)
	parent_parser.dispatch()
