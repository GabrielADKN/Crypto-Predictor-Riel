## CryptoPredictor

# 1. Description

CryptoPredictor is a Flask-based web application that uses the Prophet library to predict cryptocurrency prices. The application fetches cryptocurrency market data from the CoinGecko API and provides future price predictions through a RESTful API.


![CryptoPredictor](https://github.com/GabrielADKN/Crypto-Predictor-Riel/assets/55049118/0874b7ca-c244-4f9f-ab4a-3919a7cc76b1)
[CryptoPredictor](https://cryptopredictorfrontend.onrender.com/)



## 2. Table of Contents
- Features
- Requirements
- Installation
- Usage
- API Endpoints
- Environment Variables
- Error Monitoring
- Contributing
- License

## 3. Features
- Fetches real-time cryptocurrency market data from the CoinGecko API.
- Predicts future cryptocurrency prices using the Prophet library.
- Provides a RESTful API to interact with the model and fetch predictions.
- Logs and monitors errors using Sentry.

## 4. Requirements
- Python 3.8 or higher
- Flask
- requests
- pandas
- prophet
- plotly
- python-dotenv
- sentry-sdk

## 5. Installation
### Clone the repository:

    git clone https://github.com/yourusername/CryptoPredictor.git
    cd CryptoPredictor

### Create and activate a virtual environment:

    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

### Install the required packages:

    pip install -r requirements.txt

### Create a .env file and add your environment variables:

    touch .env

### Add the following variables to the .env file:

    CG_API_KEY=your_coingecko_api_key
    SENTRY_DSN=your_sentry_dsn

## 6. Usage Run the Flask application:

    python api.py

Access the API at http://127.0.0.1:5000.

##  7. API EndpointsGET /api/coins

- Fetches a list of available cryptocurrencies.

```json
{
    "coins": ["bitcoin", "ethereum", "ripple", ...]
}
```

- POST /api/predict:

Predicts future prices for a specified cryptocurrency.
Request:

```json
{
    "coin_id": "bitcoin",
    "days": 30
}
```

Response:

```json
{
    "predictions": [12345.67, 12348.89, ...],
    "dates": ["2023-07-01", "2023-07-02", ...],
    "plot": { ... }  // Plotly JSON
}
```

## 8. Environment Variables

- CG_API_KEY: Your CoinGecko API key for fetching cryptocurrency data.
- SENTRY_DSN: Your Sentry DSN for error monitoring.

## 9. Error Monitoring

Sentry is used for error monitoring and logging. To enable Sentry, add your Sentry DSN to the .env file. Sentry captures and reports errors, providing insights into issues within the application.

## 10. Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

- Fork the repository.
- Create a new branch.
- Make your changes.
- Submit a pull request.

## 11. License

This project is licensed under the MIT License. See the LICENSE file for details.
