from functools import wraps
from flask import request, g, jsonify
from itsdangerous import SignatureExpired, BadSignature
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

from src import app


def generate_token(user, expiration = 2400):
    s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)

    token = s.dumps({
        'id':    user.id,
        'email': user.email,
    }).decode('utf-8')

    return token


def verify_token(token):
    s = Serializer(app.config['SECRET_KEY'])

    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None

    return data


def requires_auth(method):
    @wraps(method)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)

        if token:
            string_token = token.encode('ascii', 'ignore')
            user = verify_token(string_token)

            if user:
                g.current_user = user

                return method(*args, **kwargs)

        return jsonify(message = "Authentication is required to access this resource"), 401

    return decorated
