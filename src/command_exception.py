# Exception classes used by this module.
from subprocess import CalledProcessError


class CommandError(CalledProcessError):
    """
    This exception is raised when a process run by or
    check_output() returns a non-zero exit status.

    Takes an additional argument for the method that raised the exception.

    Attributes:
      return_code, calling_process, cmd, output
    """

    def __init__(self, caught, method):
        self.return_code = caught.returncode
        self.method = method
        self.cmd = caught.cmd
        self.output = caught.output
