from flask import Flask
from config import DevelopmentConfig  # Import your configuration settings
from extensions import db, login_manager
from routes import auth, data, errors

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)  # Use development configuration settings

# Initialize database and authentication
db.init_app(app)
login_manager.init_app(app)

# Register blueprints for routes
app.register_blueprint(auth.bp)
app.register_blueprint(data.bp)
app.register_blueprint(errors.bp)

if __name__ == '__main__':
    app.run()
