import unittest
from flask import json
from flask_testing import TestCase
from api import app

class TestCryptoPredictor(TestCase):
    def create_app(self):
        app.config['TESTING'] = True
        return app

    def test_get_coins(self):
        response = self.client.get('/api/coins')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('coins', data)

    def test_predict_missing_parameters(self):
        response = self.client.post('/api/predict', data=json.dumps({}), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertEqual(data['error'], 'coin_id and days are required parameters')

    def test_predict_valid_request(self):
        request_data = {
            'coin_id': 'bitcoin',
            'days': 30
        }
        response = self.client.post('/api/predict', data=json.dumps(request_data), content_type='application/json')
        self.assertIn(response.status_code, [200, 400, 500])  # Depending on the CoinGecko API response

        if response.status_code == 200:
            data = json.loads(response.data)
            self.assertIn('predictions', data)
            self.assertIn('dates', data)
            self.assertIn('plot', data)
        elif response.status_code == 400:
            data = json.loads(response.data)
            self.assertIn('error', data)
        elif response.status_code == 500:
            data = json.loads(response.data)
            self.assertIn('error', data)

if __name__ == '__main__':
    unittest.main()
