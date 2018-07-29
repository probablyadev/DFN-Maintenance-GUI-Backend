#from flask import g

from src.database import User
from src.auth import verify, generate

# @requires_authentication
#def user():
	#return g.current_user


def check_token(token):
	if verify(token) is User:
		return 200
	else:
		return 403


def generate_token(email, password):
	user = User.get_user(email, password)

	if user is User:
		token = generate(user)

		return token, 201
	else:
		return 403
