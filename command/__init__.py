import inspect
import os
import sys
from subprocess import check_output, CalledProcessError

from command.command_exception import CommandError

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def exec_console_command(command):
    """
    Sends the system a console command to execute in bash.

    Args:
        command (str): A console command.

    Returns:
        output (str): The console output.
    """
    output = ""

    try:
        output = check_output(command)
    except CalledProcessError as error:
        # Throws a CommandError that includes the retcode, cmd, output, and this methods calling method.
        raise CommandError(error, inspect.stack()[1][3])

    return output
