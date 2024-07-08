import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import CoinSelect from './CoinSelect';
import DaysSlider from './DaysSlider';
import PredictionsList from './PredictionsList';
import PlotlyChart from './PlotlyChart';

const PredictionForm = () => {
  const [coins, setCoins] = useState([]);
  const [coinId, setCoinId] = useState('');
  const [days, setDays] = useState(1);
  const [predictions, setPredictions] = useState([]);
  const [dates, setDates] = useState([]);
  const [plotData, setPlotData] = useState(null);
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    axios.get('https://crypto-predictor-riel.onrender.com/api/coins')
      .then(response => {
        setCoins(response.data.coins);
        if (response.data.coins.length > 0) {
          setCoinId(response.data.coins[0]);
        }
      })
      .catch(error => setError(error.message));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post('https://crypto-predictor-riel.onrender.com/api/predict', { coin_id: coinId, days });
        setPredictions(response.data.predictions);
        setDates(response.data.dates);
        setPlotData(response.data.plot);
        setError('');
      } catch (error) {
        setError(error.response.data.error);
      }
    }
    setValidated(true);
  };

  return (
    <Container className="mt-5">
      <h1>Crypto Price Prediction</h1>
      <Card className="p-4 shadow">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <CoinSelect coins={coins} coinId={coinId} setCoinId={setCoinId} />
          <DaysSlider days={days} setDays={setDays} />
          <Button variant="primary" type="submit" className="mt-3">
            Predict
          </Button>
        </Form>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Card>
      {predictions.length > 0 && (
        <>
          <PredictionsList dates={dates} predictions={predictions} />
          <PlotlyChart plotData={plotData} />
        </>
      )}
    </Container>
  );
};

export default PredictionForm;
