from pssh.clients.native.parallel import ParallelSSHClient
from flask import current_app
from subprocess import check_output, STDOUT, CalledProcessError


# TODO: Rewrite the prod / dev command usage. Maybe pass in an array of the two and have a conditional decorator to inject the command and the console type.
# TODO: Add logs.
def console(command):
	if current_app.config['SSH']:
		return ssh(command)

	return terminal(command)


def ssh(command):
	config = current_app.config

	client = ParallelSSHClient(
		config[['SSH_HOSTNAME']],
		user = config['SSH_USER'],
		password = config['SSH_PASSWORD'])

	output = client.run_command(command = command, stop_on_errors = True)
	client.join(output)
	output = output[config['SSH_HOSTNAME']]

	output.stdout = ''.join(output.stdout)
	output.stderr = ''.join(output.stderr)

	if output.exit_code is not 0:
		raise CalledProcessError(
			cmd = command,
			returncode = output.exit_code,
			output = output.stderr)

	return output.stdout


def terminal(command):
	return check_output(
		command,
		shell = True,
		stderr = STDOUT,
		executable = '/bin/bash',
		universal_newlines = True)
