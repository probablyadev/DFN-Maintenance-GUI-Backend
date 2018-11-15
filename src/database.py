from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
	__tablename__ = 'user'

	id = db.Column(db.Integer(), primary_key = True)
	username = db.Column(db.String(255), unique = True)
	password = db.Column(db.String(255))

	def __init__(self, username, password):
		self.username = username
		self.active = True
		self.password = generate_password_hash(password)

	def check_password(self, password):
		return check_password_hash(self.password, password)
