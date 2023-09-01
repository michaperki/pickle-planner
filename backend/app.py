from flask import Flask, Blueprint
from config import DevelopmentConfig  # Import your configuration settings
from extensions.database import db
from extensions.login_manager import login_manager
from models.user import User
from routes import auth, data, errors

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)  # Use development configuration settings

# Initialize database and authentication
db.init_app(app)
login_manager.init_app(app)

app.register_blueprint(auth.auth_bp)
app.register_blueprint(data.data_bp)
app.register_blueprint(errors.errors_bp)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

if __name__ == '__main__':
    app.run()
