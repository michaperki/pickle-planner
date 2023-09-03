from flask import Blueprint, request, jsonify
import pyrebase
import os

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

firebase_config = {
    "apiKey": os.getenv("FIREBASE_API_KEY"),
    "authDomain": os.getenv("FIREBASE_AUTH_DOMAIN"),
    "databaseURL": os.getenv("FIREBASE_DATABASE_URL"),
    "projectId": os.getenv("FIREBASE_PROJECT_ID"),
    "storageBucket": os.getenv("FIREBASE_STORAGE_BUCKET"),
    "messagingSenderId": os.getenv("FIREBASE_MESSAGING_SENDER_ID"),
    "appId": os.getenv("FIREBASE_APP_ID"),
    "measurementId": os.getenv("FIREBASE_MEASUREMENT_ID")
}

firebase = pyrebase.initialize_app(firebase_config)
auth = firebase.auth()

@auth_bp.route('/register', methods=['POST'])
def register():
    # Handle user registration logic here
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')  # Get the email from the request

    try:
        # Create a new user with the email and password
        user = auth.create_user_with_email_and_password(email, password)
        return jsonify({"message": "User registered successfully"})
    except:
        return jsonify({"error": "Registration failed"}, 400)

@auth_bp.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    try:
        # Sign in the user with email and password
        user = auth.sign_in_with_email_and_password(email, password)
        access_token = user['idToken']
        return jsonify({"access_token": access_token})
    except:
        return jsonify({"error": "Login failed"}, 401)

@auth_bp.route('/logout')
def logout():
    # Implement logout logic here
    return jsonify({"message": "Logout successful"})

@auth_bp.route('/protected', methods=['GET'])
def protected_route():
    # Implement protected route logic here
    return jsonify(message="This is a protected route")