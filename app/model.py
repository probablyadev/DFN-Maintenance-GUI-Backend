import hashlib
import sqlite3

# TODO: Review this, global reference to db could be null.
from app import db

# https://medium.com/@perwagnernielsen/getting-started-with-flask-login-can-be-a-bit-daunting-in-this-tutorial-i-will-use-d68791e9b5b5
# Additional info for registering new users.


class User(db.model):
    username = db.Column(db.String(80), primary_key=True, unique=True)
    password = db.Column(db.String(80))
    def __init__(self, email, password):
        self.username = email
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.username

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.username)


def login_auth(username, password):
    """
    Checks whether login credentials are correct according to the database.

    Args:
        username (str): The input username.
        password (str): The input password.

    Returns:
        auth (bool): Format::

            True -- Authorized.
            False -- Unauthorized / invalid credentials.
    """
    auth = False

    # Connect to database
    authdb = sqlite3.connect('db/auth.db')
    curs = authdb.cursor()

    # Get salt
    curs.execute("SELECT salt FROM Authdata WHERE username =?", (username,))

    salt = curs.fetchone()

    # Hash entered PW with salt
    if salt is not None:
        hashedpw = hashlib.sha1(salt[0] + password).hexdigest()
    else:
        hashedpw = ' '

    # Query database
    dataarray = (username, hashedpw)
    check = curs.execute("SELECT * FROM Authdata WHERE username=? AND password=?", dataarray)

    # If query returned a result, return true. Otherwise, return false.
    if check.fetchone():
        auth = True

    return auth
