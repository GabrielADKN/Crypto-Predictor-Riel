# CryptoPredictor

CryptoPredictor is a Flask-based web application that uses the Prophet library to predict cryptocurrency prices. The application fetches cryptocurrency market data from the CoinGecko API and provides future price predictions through a RESTful API.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Error Monitoring](#error-monitoring)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fetches real-time cryptocurrency market data from the CoinGecko API.
- Predicts future cryptocurrency prices using the Prophet library.
- Provides a RESTful API to interact with the model and fetch predictions.
- Logs and monitors errors using Sentry.

## Requirements

- Python 3.8 or higher
- Flask
- requests
- pandas
- prophet
- plotly
- python-dotenv
- sentry-sdk

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/CryptoPredictor.git
   cd CryptoPredictor

2. **Create and activate a virtual environment**:

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

3. **Install the required packages**:

    ```sh
    pip install -r requirements.txt

4. **Create a .env file and add your environment variables**

   ```sh
   touch .env

   Add the following variables to the .env file:

   CG_API_KEY=your_coingecko_api_key
   SENTRY_DSN=your_sentry_dsn

## Usage
1. Run the Flask application:

    ```sh
    python api.py

2. Access the API at http://127.0.0.1:5000.

## API Endpoints

This section details the available API endpoints offered by CryptoPredictor.

### **GET /api/coins**

This endpoint retrieves a list of all cryptocurrencies currently supported by the application.

**Request:**

This endpoint accepts a GET request. No additional parameters are required in the request body.

**Response:**

Upon successful execution, the endpoint returns a JSON response with the following structure:

  ```sh
  {
    "coins": ["bitcoin", "ethereum", "ripple", ...]
  }


### **POST /api/predict**

Predicts future prices for a specified cryptocurrency.

**Request:**

```json
{
  "coin_id": "bitcoin",
  "days": 30
}

**Response**:

```json
Copy code
{
  "predictions": [12345.67, 12348.89, ...],
  "dates": ["2023-07-01", "2023-07-02", ...],
  "plot": { ... }  // Plotly JSON
}

**Environment Variables**
CG_API_KEY: Your CoinGecko API key for fetching cryptocurrency data.
SENTRY_DSN: Your Sentry DSN for error monitoring.
Error Monitoring
Sentry is used for error monitoring and logging. To enable Sentry, add your Sentry DSN to the .env file. Sentry captures and reports errors, providing insights into issues within the application.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

Fork the repository.
Create a new branch.
Make your changes.
Submit a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.
