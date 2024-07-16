import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from '../components/Register';

test('submitting the registration form successfully', async () => {
    // Mock necessary functions and values
    global.fetch = jest.fn().mockResolvedValueOnce();
    const navigateMock = jest.fn();
    jest.mock('react-router-dom', () => ({
        useNavigate: () => navigateMock,
    }));

    const { getByLabelText, getByText } = render(<Register />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.submit(getByText('Register'));

    expect(navigateMock).toHaveBeenCalledWith('/login');
});

test('handling registration failure and displaying error message', async () => {
    // Mock necessary functions and values
    global.fetch = jest.fn().mockRejectedValueOnce({
        response: { data: { message: 'Registration failed' } },
    });

    const { getByLabelText, getByText } = render(<Register />);
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'invalidpassword' } });
    fireEvent.submit(getByText('Register'));

    expect(getByText('Registration failed')).toBeInTheDocument();
});