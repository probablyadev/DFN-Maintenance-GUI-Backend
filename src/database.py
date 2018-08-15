from src.extensions import db, bcrypt


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer(), primary_key = True)
    username = db.Column(db.String(255), unique = True)
    password = db.Column(db.String(255))

    def __init__(self, username, password):
        self.username = username
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password).decode("utf-8")

    @staticmethod
    def get_user(username, password):
        user = User.query.filter_by(username = username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None
