from flask import Blueprint, request, jsonify
from extensions import db
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    # Handle user registration logic here
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')  # Get the email from the request

    # Check if username or email already exists
    existing_user = User.query.filter_by(username=username).first()
    existing_email = User.query.filter_by(email=email).first()
    
    if existing_user:
        return jsonify({"error": "Username already exists"}, 400)
    if existing_email:
        return jsonify({"error": "Email already exists"}, 400)

    # Create a new user with the password hash and email
    new_user = User(username=username, email=email)
    new_user.set_password(password)  # Set the password hash
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"})

@auth_bp.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"error": "Login failed"}, 401)

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"})
