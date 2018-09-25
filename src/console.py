from pssh.clients.native.parallel import ParallelSSHClient
from flask import current_app
from subprocess import check_output, STDOUT, CalledProcessError


# TODO: Rewrite the prod / dev command usage. Maybe pass in an array of the two and have a conditional decorator to inject the command and the console type.
# TODO: Add logs.
def console(prod_command, dev_command = ''):
	if not current_app.config['USE_DEV_COMMAND'] or dev_command is '':
		command = prod_command
	else:
		command = dev_command

	if current_app.config['USE_CONSOLE']:
		output = terminal(command)
	else:
		output = ssh(command)

	return output


def ssh(command):
	hostname = 'localhost'
	client = ParallelSSHClient([hostname], user = current_app.config['USER'], password = current_app.config['PASSWORD'])

	output = client.run_command(command = command, stop_on_errors = True)
	client.join(output)
	output = output[hostname]

	output.stdout = ''.join(output.stdout)
	output.stderr = ''.join(output.stderr)

	if output.exit_code is not 0:
		raise CalledProcessError(cmd = command, returncode = output.exit_code, output = output.stderr)

	return output.stdout


def terminal(command):
	return check_output(command, shell = True, stderr = STDOUT, executable = '/bin/bash', universal_newlines = True)
