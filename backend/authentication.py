# backend/authentication.py
import os
import pyrebase
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

firebase_config = {
    'apiKey': os.getenv('FIREBASE_API_KEY'),
    'authDomain': os.getenv('FIREBASE_AUTH_DOMAIN'),
    'projectId': os.getenv('FIREBASE_PROJECT_ID'),
    'storageBucket': os.getenv('FIREBASE_STORAGE_BUCKET'),
    'messagingSenderId': os.getenv('FIREBASE_MESSAGING_SENDER_ID'),
    'appId': os.getenv('FIREBASE_APP_ID'),
    'measurementId': os.getenv('FIREBASE_MEASUREMENT_ID'),
    'databaseURL': os.getenv('FIREBASE_DATABASE_URL'),
}

firebase = pyrebase.initialize_app(firebase_config)
auth = firebase.auth()

email = "test1234@gmail.com"
password = "123456"

user = auth.create_user_with_email_and_password(email, password)
print(user)
