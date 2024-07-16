from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import requests
from dotenv import load_dotenv
import os
import json
from models.prophet import predict_with_saved_model
import logging
from logging.handlers import RotatingFileHandler
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from flask_cors import CORS

load_dotenv()
api_key = os.environ.get("CG_API_KEY")
headers = {'x-cg-demo-api-key': api_key}

sentry_sdk.init(
    dsn=os.environ.get("SENTRY_DSN"),
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
    integrations=[FlaskIntegration()],
)

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
jwt = JWTManager(app)

# Configure logging
if not app.debug:  # Only set up logging in production
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/crypto_predictor.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)

    app.logger.setLevel(logging.INFO)
    app.logger.info('CryptoPredictor startup')

# User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Authentication routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'username': user.username, 'email': user.email})
        login_user(user)
        return jsonify(access_token=access_token)
    else:
        return jsonify({'message': 'Login failed'}), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/api/coins', methods=['GET'])
@jwt_required()
def get_coins():
    try:
        response = requests.get('https://api.coingecko.com/api/v3/coins/markets', params={'vs_currency': 'usd'}, headers=headers)
        response.raise_for_status()
        coins_list = response.json()
        coins = [coin['id'] for coin in coins_list]
        return jsonify({'coins': coins})
    except requests.RequestException as e:
        app.logger.error('Error getting coins list: %s', str(e))
        return jsonify({'error': 'Failed to get coins list'}), 417

@app.route('/api/predict', methods=['POST'])
@jwt_required()
def predict():
    data = request.get_json()
    coin_id = data.get('coin_id')
    days = data.get('days')

    if not coin_id or not days:
        return jsonify({'error': 'coin_id and days are required parameters'}), 400

    try:
        model_path = f"{coin_id}_prophet_model.pkl"
        predictions, dates, plot_json = predict_with_saved_model(coin_id, model_path, days)
        return jsonify({'predictions': predictions, 'dates': dates, 'plot': json.loads(plot_json)})
    except ValueError as e:
        app.logger.error('ValueError in prediction: %s', str(e))
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        app.logger.error('Unexpected error in prediction: %s', str(e), exc_info=True)
        raise e
        # return jsonify({'error': str(e)}), 417

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=os.environ.get('FLASK_DEBUG', 'false').lower() == 'true')
