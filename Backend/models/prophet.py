import requests
import pandas as pd
from prophet import Prophet
from prophet.plot import plot_plotly
import plotly
import pickle
import json
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()
api_key = os.environ.get("CG_API_KEY")
headers = {'x-cg-demo-api-key': api_key}

def train_and_save_model(coin_id, model_path):
    """
    Train a Prophet model and save it to a file along with the current date.
    
    Parameters:
    coin_id (str): The ID of the cryptocurrency to get data for.
    model_path (str): The file path where the trained model will be saved.
    """
    try:
        # Get the market data for the last 60 days
        response = requests.get(f'https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart', params={
                                'vs_currency': 'usd', 'days': 60}, headers=headers)
        
        # Check if the request was successful
        response.raise_for_status()
        
        # Convert the response to a dataframe
        market_data = response.json()
        prices = market_data['prices']

        if not prices:
            raise ValueError("No data available for this period.")

        # Create a dataframe from the prices data
        df = pd.DataFrame(prices, columns=['ds', 'y'])
        df['ds'] = pd.to_datetime(df['ds'], unit='ms')

        # Initialize and fit the Prophet model
        model = Prophet()
        model.fit(df)

        # Save the model and the training date to a file
        model_data = {
            'model': model,
            'last_trained': datetime.now()
        }
        with open(model_path, 'wb') as f:
            pickle.dump(model_data, f)
    
    except Exception as e:
        raise ValueError(f"Error in training and saving the model: {str(e)}")

def predict_with_saved_model(coin_id, model_path, days):
    """
    Use a pre-trained Prophet model to predict cryptocurrency prices.
    
    Parameters:
    coin_id (str): The ID of the cryptocurrency to get data for.
    model_path (str): The file path where the trained model is saved.
    days (int): The number of days to predict into the future.

    Returns:
    tuple: A tuple containing the predictions, dates, and the plot in JSON format.
    """
    try:
        # Load the model from the file
        try:
            with open(model_path, 'rb') as f:
                model_data = pickle.load(f)
            model = model_data['model']
            last_trained = model_data['last_trained']
        except FileNotFoundError:
            last_trained = None

        # Check if the model needs to be retrained (daily update)
        if last_trained is None or (datetime.now() - last_trained).days >= 1:
            train_and_save_model(coin_id, model_path)
            with open(model_path, 'rb') as f:
                model_data = pickle.load(f)
            model = model_data['model']

        # Create a dataframe for future dates
        future = model.make_future_dataframe(periods=int(days))
        forecast = model.predict(future)

        # Extract predictions and dates from the forecast
        predictions = forecast['yhat'][-int(days):].tolist()
        dates = forecast['ds'][-int(days):].dt.strftime('%Y-%m-%d').tolist()

        # Generate Plotly figure
        fig = plot_plotly(model, forecast)
        plot_json = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

        return predictions, dates, plot_json
    
    except Exception as e:
        raise ValueError(f"Error in Prophet prediction: {str(e)}")
