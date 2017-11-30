from flask import Blueprint, jsonify

error_handlers = Blueprint("error_handlers", __name__)

# Catch exceptions thrown by python and send off a response to the web app.
@error_handlers.app_errorhandler(IOError)
def handle_io_error(error):
    return jsonify(
        error = True,
        generic = "Error while performing IO with hardware",
        message = error.message
    ), 500


@error_handlers.app_errorhandler(RuntimeError)
def handle_runtime_error(error):
    return jsonify(
        error = True,
        generic = "A runtime error occurred",
        message = error.message
    ), 500


@error_handlers.app_errorhandler(AssertionError)
def handle_assertion_error(error):
    return jsonify(
        error = True,
        generic = "Error while asserting state",
        message = error.message
    ), 409


@error_handlers.app_errorhandler(AttributeError)
def handle_attribute_error(error):
    return jsonify(
        error = True,
        generic = "Attribute not found",
        message = error.message
    ), 500
