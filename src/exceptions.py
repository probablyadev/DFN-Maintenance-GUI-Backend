from flask import Blueprint, jsonify
from sqlalchemy.exc import IntegrityError

from command.command_exception import CommandError

error_handlers = Blueprint("error_handlers", __name__)


# Catch exceptions thrown by python and send off a response to the web app.
@error_handlers.app_errorhandler(IOError)
def handle_io_error(error):
    return jsonify(
        type = "IOError",
        generic = "Error while performing IO with hardware",
        message = error.message
    ), 500


@error_handlers.app_errorhandler(RuntimeError)
def handle_runtime_error(error):
    return jsonify(
        type = "RuntimeError",
        generic = "A runtime error occurred",
        message = error.message
    ), 500


@error_handlers.app_errorhandler(AssertionError)
def handle_assertion_error(error):
    return jsonify(
        type = "AssertionError",
        generic = "Error while asserting state",
        message = error.message
    ), 500


@error_handlers.app_errorhandler(AttributeError)
def handle_attribute_error(error):
    return jsonify(
        type = "AttributeError",
        generic = "Attribute not found",
        message = error.message
    ), 500


@error_handlers.app_errorhandler(IntegrityError)
def handle_integrity_error(error):
    return jsonify(
        type = "IntegrityError",
        generic = "Raised when the execution of a database operation fails.",
        message = error.message,
    ), 500


@error_handlers.app_errorhandler(CommandError)
def handle_command_error(error):
    return jsonify(
        type = "CommandError",
        generic = "Error while executing a subprocess command.",
        return_code = error.return_code,
        method = error.method,
        cmd = error.cmd,
        output = error.output
    ), 500
