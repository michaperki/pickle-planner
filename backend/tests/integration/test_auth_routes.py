from app import create_app
from models.user import User  # Import the User model from your app
from extensions import db  # Import the db object from your app
import pytest

@pytest.fixture
def app():
    app = create_app('testing')  # Use the 'testing' configuration
    return app

@pytest.mark.usefixtures('client')
class TestAuthRoutes:

    def test_register_route(self, client):
        url = '/auth/register'
        data = {'username': 'test_user', 'password': 'test_password', 'email': 'test@example.com'}

        # Ensure the user does not exist before the test
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            db.session.delete(existing_user)
            db.session.commit()

        response = client.post(url, json=data)

        assert response.status_code == 200
        assert b'User registered successfully' in response.data

    def test_login_route(self, client):
        # Similar structure for testing the login route
        pass
