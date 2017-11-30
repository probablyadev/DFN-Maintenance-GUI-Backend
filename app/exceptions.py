from flask import Blueprint, jsonify

error_handlers = Blueprint("error_handlers", __name__)

# Catch exceptions thrown by python and send off a response to the web app.
@error_handlers.app_errorhandler(IOError)
def handle_io_error(error):
    return jsonify(
        error = True,
        message = "Error while performing IO with hardware"
    ), 500
