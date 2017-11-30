from flask import render_template, request, jsonify
from sqlalchemy.exc import IntegrityError
from app.api.config_file import config_file_endpoints
from app.api.gps import gps_endpoints
from app.api.hdd import hdd_endpoints
from app.api.interval_control_test import interval_control_test_endpoints
from app.api.time import time_endpoints
from app.exceptions import error_handlers
from app.model import User
from app.utils.auth import generate_token, verify_token, requires_auth
from index import app, db
from api.camera import camera_endpoints

app.register_blueprint(camera_endpoints)
app.register_blueprint(config_file_endpoints)
app.register_blueprint(gps_endpoints)
app.register_blueprint(time_endpoints)
app.register_blueprint(hdd_endpoints)
app.register_blueprint(interval_control_test_endpoints)
app.register_blueprint(error_handlers)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods = ['GET'])
def any_root_path(path):
    return render_template('index.html')


@app.route("/api/user", methods = ["GET"])
@requires_auth
def get_user():
    return jsonify(result = g.current_user)


@app.route("/api/create_user", methods = ["POST"])
def create_user():
    """Currently only used when testing the system."""
    incoming = request.get_json()
    user = User(
        email = incoming["email"],
        password = incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message = "User with that email already exists"), 409

    new_user = User.query.filter_by(email = incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route("/api/get_token", methods = ["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])

    if user:
        return jsonify(token = generate_token(user))
    else:
        return jsonify(error = True), 403


@app.route("/api/is_token_valid", methods = ["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid = True)
    else:
        return jsonify(token_is_valid = False), 403
