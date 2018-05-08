from command import exec_console_command


def system_time():
    """
    Outputs the current system time to the user.

    Returns:
        The current system time.
    """
    return exec_console_command("date")


def get_timezone():
    """
    Gets the systems current timezone.

    Returns:
        timezone (str): The systems timezone.
    """
    return exec_console_command("timedatectl status | grep -oP '(?<=Time zone: ).*(?= \()'")


def change_timezone(timezone):
    """
    Changes the system's timezone.

    Args:
        timezone (str): Timezone information to change the system's timezone to.
    """
    exec_console_command("timedatectl set-timezone {0}".format(timezone))
