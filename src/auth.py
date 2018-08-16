from src.database import User


def authenticate(username, password):
	user = User.query.filter_by(username = username).one()

	if user.check_password(password):
		return user

def identity(payload):
    user_id = payload['identity']
    user = User.query.filter_by(id = user_id).one()

    return user
