import { render, fireEvent } from '@testing-library/react';
import PredictionForm from './PredictionForm';

describe('PredictionForm', () => {
    test('renders form elements correctly', () => {
        const { getByLabelText, getByPlaceholderText, getByText } = render(<PredictionForm />);
        expect(getByLabelText('Cryptocurrency')).toBeInTheDocument();
        expect(getByLabelText('Days')).toBeInTheDocument();
        expect(getByPlaceholderText('Enter email')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
        expect(getByText('Predict')).toBeInTheDocument();
    });

    test('fetches coins on mount', async () => {
        const fetchMock = jest.fn().mockResolvedValueOnce({ data: { coins: ['BTC', 'ETH'] } });
        global.fetch = fetchMock;
        render(<PredictionForm />);
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/coins', {
            headers: { Authorization: 'Bearer mockToken' },
        });
    });

    test('handles form submission successfully', async () => {
        const postMock = jest.fn().mockResolvedValueOnce({ data: { predictions: [1, 2, 3], dates: ['2021-01-01', '2021-01-02', '2021-01-03'], plot: { data: [], layout: {} } } });
        global.fetch = jest.fn().mockImplementationOnce(() => ({ post: postMock }));
        const { getByLabelText, getByText } = render(<PredictionForm />);
        fireEvent.change(getByLabelText('Cryptocurrency'), { target: { value: 'BTC' } });
        fireEvent.change(getByLabelText('Days'), { target: { value: 3 } });
        fireEvent.submit(getByText('Predict'));
        expect(postMock).toHaveBeenCalledWith('http://localhost:5000/api/predict', { coin_id: 'BTC', days: 3 }, {
            headers: { Authorization: 'Bearer mockToken' },
        });
    });

    test('handles form submission failure', async () => {
        const postMock = jest.fn().mockRejectedValueOnce({ response: { data: { error: 'Invalid credentials' } } });
        global.fetch = jest.fn().mockImplementationOnce(() => ({ post: postMock }));
        const { getByLabelText, getByText } = render(<PredictionForm />);
        fireEvent.change(getByLabelText('Cryptocurrency'), { target: { value: 'BTC' } });
        fireEvent.change(getByLabelText('Days'), { target: { value: 3 } });
        fireEvent.submit(getByText('Predict'));
        expect(postMock).toHaveBeenCalledWith('http://localhost:5000/api/predict', { coin_id: 'BTC', days: 3 }, {
            headers: { Authorization: 'Bearer mockToken' },
        });
        expect(getByText('Invalid credentials')).toBeInTheDocument();
    });
});