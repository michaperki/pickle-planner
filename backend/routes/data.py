from flask import Blueprint, jsonify
from models import Pet  # Import your database model
from flask_login import login_required

data_bp = Blueprint('data', __name__, url_prefix='/data')

@data_bp.route('/pets')
@login_required
def get_pets():
    # Retrieve pet data from the database or other data source
    pets = Pet.query.all()
    pet_list = [{"name": pet.name, "type": pet.type} for pet in pets]
    return jsonify(pet_list)
