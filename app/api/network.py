from flask import Blueprint, jsonify

from app.utils.auth import requires_auth
from command.network import *

network_endpoints = Blueprint("network_api", __name__)


@network_endpoints.route("/api/network/check_vpn", methods = ["GET"])
@requires_auth
def check_vpn_endpoint():
    """Delivers a summary of the VPN connectivity of the system."""
    check_vpn_message, check_vpn_status = check_vpn()

    return jsonify(
        check_vpn_status = check_vpn_status,
        check_vpn_message = check_vpn_message
    )


@network_endpoints.route("/api/network/internet_check", methods = ["GET"])
@requires_auth
def internet_check_endpoint():
    """Delivers a summary of the internet connectivity of the system."""
    check_internet_message, check_internet_status = check_internet()

    return jsonify(
        check_internet_status = check_internet_status,
        check_internet_message = check_internet_message
    )


@network_endpoints.route("/api/network/restart_modem", methods = ["GET"])
@requires_auth
def restart_modem_endpoint():
    """Restarts the modem network interface."""
    restart_modem_message = restart_modem()
    check_internet_message, check_internet_status = check_internet()

    return jsonify(
        check_internet_status = check_internet_status,
        restart_modem_message = restart_modem_message,
        check_internet_message = check_internet_message
    )


@network_endpoints.route("/api/network/restart_vpn", methods = ["GET"])
@requires_auth
def restart_vpn_endpoint():
    """Restarts the system's VPN daemon."""
    restart_vpn_message = restart_vpn()
    check_vpn_message, check_vpn_status = check_vpn()

    return jsonify(
        check_vpn_status = check_vpn_status,
        restart_vpn_message = restart_vpn_message,
        check_vpn_message = check_vpn_message
    )
