from pssh.clients.native.parallel import ParallelSSHClient
from flask import jsonify, current_app


def console(command):
	# Code for running commands on the local machine (rather than remotely)
	# from subprocess import check_output, STDOUT
	# return check_output(command, shell = True, stderr = STDOUT, executable = '/bin/bash', universal_newlines = True)

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


def exception_json(error):
	cmd = ''
	returncode = 1
	output = 'Error'

	if error is CalledProcessError:
		cmd = error.cmd
		returncode = error.returncode
		output = error.output
	else:
		output = error.message

	return jsonify(cmd = cmd, returncode = returncode, output = output)
