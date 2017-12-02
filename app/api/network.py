from flask import Blueprint, jsonify
from app.utils.auth import requires_auth
from command.network import *


network_endpoints = Blueprint("network_api", __name__)


@network_endpoints.route("/api/network/check_vpn", methods = ["GET"])
@requires_auth
def check_vpn_endpoint():
    """Delivers a summary of the VPN connectivity of the system."""
    message, vpn_status = check_vpn()

    return jsonify(
        vpn_status = vpn_status,
        message = message
    )


@network_endpoints.route("/api/network/internet_check", methods = ["GET"])
@requires_auth
def internet_check_endpoint():
    """Delivers a summary of the internet connectivity of the system."""
    message, internet_status = check_vpn()

    return jsonify(
        internet_status = internet_status,
        message = message
    )


@network_endpoints.route("/api/network/restart_modem", methods = ["GET"])
@requires_auth
def restart_modem_endpoint():
    """Restarts the modem network interface."""
    restart_message = restart_modem()
    internet_message, internet_status = internet_check()

    return jsonify(
        internet_status = internet_status,
        message = restart_message + internet_message
    )


@network_endpoints.route("/api/network/restart_vpn", methods = ["GET"])
@requires_auth
def restart_vpn_endpoint():
    """Restarts the system's VPN daemon."""
    restart_message = restart_vpn()
    internet_message, vpn_status = check_vpn()

    return jsonify(
        vpn_status = vpn_status,
        message = restart_message + internet_message
    )
