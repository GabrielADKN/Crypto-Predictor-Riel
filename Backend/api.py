from flask import Flask, jsonify, request
import requests
from dotenv import load_dotenv
import os
import json
from models.prophet import predict_with_saved_model
import logging
from logging.handlers import RotatingFileHandler
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

load_dotenv()
api_key = os.environ.get("CG_API_KEY")
headers = {'x-cg-demo-api-key': api_key}

sentry_sdk.init(
    dsn=os.environ.get("SENTRY_DSN"),
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    traces_sample_rate=1.0,
    # Set profiles_sample_rate to 1.0 to profile 100%
    # of sampled transactions.
    # We recommend adjusting this value in production.
    profiles_sample_rate=1.0,
    integrations=[FlaskIntegration()],
)
app = Flask(__name__)

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

@app.route('/api/coins', methods=['GET'])
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
