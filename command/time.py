from app import constants
from command import exec_console_command


def output_time():
    """
    Outputs the current system time to the user.

    Returns:
        consoleOutput (str): Resulting console feedback.
    """
    consoleOutput = exec_console_command(constants.outputTime)

    return consoleOutput + "\n"


def timezone_change(timezone):
    """
    Changes the system's timezone.

    Args:
        timezone (str): Timezone information to change the system's timezone to.

    Returns:
        constants.timezoneChanged (str): Resulting feedback.
    """
    command = constants.setTimezone
    exec_console_command(command.format(timezone))

    return constants.timezoneChanged.format(timezone)
