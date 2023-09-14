import os

from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

load_dotenv()

secret_key = os.getenv('SECRET_KEY')
# Database
db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_ip = os.getenv("DB_IP")
db_dbname = os.getenv("DB_DBNAME")

app = Flask(__name__)
CORS(app, origins=["http://95.165.102.189:3000"])

app.secret_key = secret_key
app.config['SESSION_PERMANENT'] = True
app.config['SESSION_USE_SIGNER'] = True  # Указываем, что данные сессии будут подписаны для безопасности

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{db_username}:{db_password}@{db_ip}/{db_dbname}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

UPLOAD_FOLDER = 'uploads'

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'asdasd123123'
app.config['SECRET_KEY'] = 'qwerty123123'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Session(app)
MainFilepath = ''


db = SQLAlchemy(app)

migrate = Migrate(app, db)

from .routes import Main_routes
from .routes import Profile