from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

from app.config import ProductionConfig

app = Flask(__name__, static_folder = "./frontend/dist", template_folder = "./frontend")
app.config.from_object(ProductionConfig)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
