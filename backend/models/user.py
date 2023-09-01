# models/user.py
from extensions import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def get_id(self):
        return str(self.id)

    def is_authenticated(self):
        # Implement your authentication logic here
        # For example, check if the user has valid credentials
        return True  # Return True if the user is authenticated

    def is_active(self):
        # Implement your logic to check if the user's account is active
        return True  # Return True if the user's account is active

    def is_anonymous(self):
        return False
