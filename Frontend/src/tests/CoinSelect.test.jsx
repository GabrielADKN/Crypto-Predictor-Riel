import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CoinSelect from './CoinSelect';

describe('CoinSelect Component', () => {
    const coins = ['BTC', 'ETH', 'LTC'];
    const coinId = 'ETH';
    const setCoinId = jest.fn();

    it('renders form group with select input', () => {
        const { getByLabelText } = render(<CoinSelect coins={coins} coinId={coinId} setCoinId={setCoinId} />);
        expect(getByLabelText('Cryptocurrency')).toBeInTheDocument();
        expect(getByLabelText('Cryptocurrency').tagName).toBe('LABEL');
    });

    it('select input value is set properly', () => {
        const { getByDisplayValue } = render(<CoinSelect coins={coins} coinId={coinId} setCoinId={setCoinId} />);
        expect(getByDisplayValue('ETH')).toBeInTheDocument();
    });

    it('triggers onChange function correctly', () => {
        const { getByDisplayValue } = render(<CoinSelect coins={coins} coinId={coinId} setCoinId={setCoinId} />);
        fireEvent.change(getByDisplayValue('ETH'), { target: { value: 'BTC' } });
        expect(setCoinId).toHaveBeenCalledWith('BTC');
    });

    it('renders options based on coins array', () => {
        const { getAllByRole } = render(<CoinSelect coins={coins} coinId={coinId} setCoinId={setCoinId} />);
        const options = getAllByRole('option');
        expect(options).toHaveLength(3); // Assuming 3 coins in the array
        expect(options[0].textContent).toBe('BTC');
        expect(options[1].textContent).toBe('ETH');
        expect(options[2].textContent).toBe('LTC');
    });
});