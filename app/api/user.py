from flask import Blueprint, jsonify, request, g
from sqlalchemy.exc import IntegrityError
from index import db
from app.utils.auth import requires_auth
from app.model import User
from app.utils.auth import generate_token, verify_token, requires_auth


user_endpoints = Blueprint("user_api", __name__)


@user_endpoints.route("/api/user/get_user", methods = ["GET"])
@requires_auth
def get_user():
    return jsonify(user = g.current_user)


@user_endpoints.route("/api/user/create_user", methods = ["POST"])
def create_user():
    """Currently only used when testing the backend system."""
    incoming = request.get_json()

    user = User(
        email = incoming["email"],
        password = incoming["password"]
    )

    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        raise IntegrityError("User with that email already exists")

    new_user = User.query.filter_by(email = incoming["email"]).first()

    return jsonify(
        user_id = user.id,
        token = generate_token(new_user)
    )


@user_endpoints.route("/api/user/get_token", methods = ["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])

    if user:
        return jsonify(token = generate_token(user))
    else:
        return jsonify(error = True), 403


@user_endpoints.route("/api/user/is_token_valid", methods = ["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid = True)
    else:
        return jsonify(token_is_valid = False), 403
