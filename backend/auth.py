from functools import wraps
from flask import request, g, jsonify
from itsdangerous import SignatureExpired, BadSignature
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

from backend import flaskapp


def generate_token(user, expiration = 2400):
    s = Serializer(flaskapp.config['SECRET_KEY'], expires_in = expiration)
    token = s.dumps({
        'id':    user.id,
        'email': user.email,
    }).decode('utf-8')

    return token

# https://blog.miguelgrinberg.com/post/restful-authentication-with-flask
def verify_token(token):
    s = Serializer(flaskapp.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None

    return data


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)

        if token:
            string_token = token.encode('ascii', 'ignore')
            user = verify_token(string_token)

            if user:
                g.current_user = user

                return f(*args, **kwargs)

        return jsonify(message = "Authentication is required to access this resource"), 401

    return decorated
