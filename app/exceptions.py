from flask import Response, Blueprint

error_handlers = Blueprint("error_handlers", __name__)

@error_handlers.app_errorhandler(401)
def page_not_found(error):
    """
    Handle login failed.

    :param error:

    :return:
    """
    return Response('<p>Login failed</p>')