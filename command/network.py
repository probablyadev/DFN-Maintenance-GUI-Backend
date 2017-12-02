# NETWORK UTILITIES
import re

import constants

from command import exec_console_command


def check_internet():
    """
    Delivers a summary of the internet connectivity of the system.

    Returns:
        feedbackOutput (str): Resulting feedback.
        internetStatus (bool): Represents the internet connectivity of the system.
    """
    consoleOutput = exec_console_command(constants.internetCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.internetCheckFailed

    if "unknown" not in consoleOutput and "failure" not in consoleOutput:
        splitOutput = re.split(",", consoleOutput)

        if "0" not in splitOutput[1]:
            status = True
            ipAddress = exec_console_command(constants.getInternetIP)
            feedbackOutput = constants.internetCheckPassed.format(ipAddress)

    return feedbackOutput, status


def restart_modem():
    """Restarts the modem network interface."""
    command = "ifdown ppp0; sleep 8; ifup ppp0; sleep 8; ifconfig ppp0"

    exec_console_command(command)

    return "Modem restarted successfully."


def restart_vpn():
    """Restarts the system's VPN daemon."""
    command = "service openvpn restart; sleep 10; ifconfig tun0"

    exec_console_command(command)

    return "VPN restarted successfully."


def check_vpn():
    """
    Delivers a summary of the VPN connectivity of the system.

    Returns:
        feedbackOutput (str): Resulting feedback.
        vpnStatus (bool): Represents the VPN connectivity of the system.
    """
    consoleOutput = exec_console_command(constants.vpnCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.vpnCheckFailed

    if "0" not in re.split(",", consoleOutput)[1]:
        status = True
        ipAddress = exec_console_command(constants.getVpnIP)
        feedbackOutput = constants.vpnCheckPassed.format(ipAddress)

    return feedbackOutput, status
