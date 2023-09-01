from flask import Blueprint, jsonify
from werkzeug.exceptions import HTTPException

bp = Blueprint('errors', __name__)

@bp.app_errorhandler(HTTPException)
def handle_exception(e):
    response = e.get_response()
    response.data = jsonify(error=str(e))
    response.status_code = e.code
    return response

@bp.route('/error_example')
def error_example():
    # Simulate an error (for testing error handling)
    raise HTTPException("An example error occurred", 500)
