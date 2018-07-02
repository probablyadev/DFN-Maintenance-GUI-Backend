from flask import Blueprint, jsonify, request, g
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
import logging

from backend.model import User
from backend.auth import generate_token, verify_token, requires_auth
from backend import db

user_endpoints = Blueprint("user_endpoints", __name__)
CORS(user_endpoints)

@user_endpoints.route("/api/user/getUser", methods = ["GET"])
@requires_auth
def get_user_endpoint():
    """Gets the currently logged in user."""
    return jsonify(user = g.current_user)


@user_endpoints.route("/api/user/getToken", methods = ["POST"])
def get_token_endpoint():
    """Generates a token for the users session if email and password is valid."""
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])

    if user:
        return jsonify(token = generate_token(user))
    else:
        return jsonify(error = True), 403


@user_endpoints.route("/api/user/isTokenValid", methods = ["POST"])
def is_token_valid_endpoint():
    """Checks that a given token is valid."""
    incoming = request.get_json()

    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(valid = True)
    else:
        return jsonify(valid = False)
