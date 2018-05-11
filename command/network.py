# NETWORK UTILITIES
from command import exec_console_command


def check_vpn():
    """
    Delivers a summary of the VPN connectivity of the system.

    Returns:
        pingOutput (str): Successful output from ping.
        vpnIP (str): VPN IP.
    """
    pingOutput = exec_console_command("ping -c 1 10.1.16.1")
    vpnIP = exec_console_command("ifconfig | grep tun0 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'| cut -c6-")

    return pingOutput, vpnIP


def restart_vpn():
    """Restarts the system's VPN daemon."""
    exec_console_command("service openvpn restart; sleep 10; ifconfig tun0")


def check_internet():
    """
    Delivers a summary of the internet connectivity of the system.

    Returns:
        pingOutput (str): Successful output from ping.
        ipAddress (str): Internet IP.
    """
    pingOutput = exec_console_command("ping -c 1 www.google.com")
    ipAddress = exec_console_command("ifconfig | grep eth1 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | cut -c6-") # curl ipinfo.io/ip

    return pingOutput, ipAddress


def restart_modem():
    """Restarts the modem network interface."""
    exec_console_command("ifdown ppp0; sleep 8; ifup ppp0; sleep 8; ifconfig ppp0")
