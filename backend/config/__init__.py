import os

class Config:
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or 'sqlite:///your-database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    LOGIN_DISABLED = False
    CORS_ALLOWED_ORIGINS = []

class DevelopmentConfig(Config):
    DEBUG = True
    CORS_ALLOWED_ORIGINS = ['http://localhost:3000']

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'

class ProductionConfig(Config):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')

config_by_name = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
