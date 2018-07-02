from flask import Blueprint, jsonify

from backend.auth import requires_auth
from command.network import *

network_endpoints = Blueprint("network_api", __name__)


@network_endpoints.route("/api/network/checkVPN", methods = ["GET"])
@requires_auth
def check_vpn_endpoint():
    """Delivers a summary of the VPN connectivity of the system."""
    pingOutput, vpnIP = check_vpn()

    return jsonify(
        pingOutput = pingOutput,
        vpnIP = vpnIP
    )


@network_endpoints.route("/api/network/restartVPN", methods = ["GET"])
@requires_auth
def restart_vpn_endpoint():
    """Restarts the system's VPN daemon and checks for a vpn connection."""
    restart_vpn()
    pingOutput, vpnIP = check_vpn()

    return jsonify(
        pingOutput = pingOutput,
        vpnIP = vpnIP
    )


@network_endpoints.route("/api/network/checkInternet", methods = ["GET"])
@requires_auth
def check_internet_endpoint():
    """Delivers a summary of the internet connectivity of the system."""
    pingOutput, ipAddress = check_internet()

    return jsonify(
        pingOutput = pingOutput,
        ipAddress = ipAddress
    )


@network_endpoints.route("/api/network/restartModem", methods = ["GET"])
@requires_auth
def restart_modem_endpoint():
    """Restarts the modem network interface."""
    restart_modem()
    pingOutput, ipAddress = check_internet()

    return jsonify(
        pingOutput = pingOutput,
        ipAddress = ipAddress
    )
