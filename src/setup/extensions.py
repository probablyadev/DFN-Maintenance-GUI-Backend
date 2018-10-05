from flask_jwt_extended import JWTManager
from flask_cors import CORS

from src.database import db


def extensions(flask_app):
	db.init_app(flask_app)
	CORS(flask_app)
	JWTManager(flask_app)
