from functools import wraps
from flask import request, g, jsonify, current_app as app
from itsdangerous import SignatureExpired, BadSignature
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer


def generate(user, expiration = 2400):
    s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)

    token = s.dumps({
        'id':    user.id,
        'username': user.username,
    }).decode('utf-8')

    return token


def verify(token):
    serial = Serializer(app.config['SECRET_KEY'])

    try:
        return serial.loads(token)
    except (BadSignature, SignatureExpired):
        return None


def requires_auth(method):
    @wraps(method)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)

        if token:
            string_token = token.encode('ascii', 'ignore')
            user = verify(string_token)

            if user:
                g.current_user = user

                return method(*args, **kwargs)

        return jsonify(message = "Authentication is required to access this resource"), 401

    return decorated
