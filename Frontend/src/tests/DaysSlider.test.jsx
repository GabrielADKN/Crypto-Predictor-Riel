import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DaysSlider from './DaysSlider';

describe('DaysSlider', () => {
    test('renders days slider with correct initial value', () => {
        const setDays = jest.fn();
        const { getByLabelText } = render(<DaysSlider days={7} setDays={setDays} />);
        const slider = getByLabelText('Days');
        expect(slider).toHaveValue(7);
    });

    test('updates days value when slider is changed', () => {
        const setDays = jest.fn();
        const { getByLabelText } = render(<DaysSlider days={7} setDays={setDays} />);
        const slider = getByLabelText('Days');
        fireEvent.change(slider, { target: { value: 10 } });
        expect(setDays).toHaveBeenCalledWith(10);
    });

    test('renders selected days value', () => {
        const { getByText } = render(<DaysSlider days={10} setDays={() => { }} />);
        const selectedDays = getByText('Selected Days: 10');
        expect(selectedDays).toBeInTheDocument();
    });
});