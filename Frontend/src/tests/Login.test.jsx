import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

test('submitting the login form successfully', async () => {
    // Mock necessary functions and values
    const loginMock = jest.fn();
    global.localStorage = {
        setItem: jest.fn(),
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ access_token: 'mockAccessToken' }),
    });

    const { getByLabelText, getByText } = render(<Login />);
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.submit(getByText('Login'));

    // Assertion for successful login
    expect(loginMock).toHaveBeenCalledWith({ token: 'mockAccessToken' });
    expect(global.localStorage.setItem).toHaveBeenCalledWith('token', 'mockAccessToken');
});

test('handling login failure and displaying error message', async () => {
    // Mock necessary functions and values
    global.fetch = jest.fn().mockRejectedValueOnce({
        response: { data: { message: 'Invalid credentials' } },
    });

    const { getByLabelText, getByText } = render(<Login />);
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.submit(getByText('Login'));

    // Assertion for login failure
    expect(getByText('Invalid credentials')).toBeInTheDocument();
});

test('checking if all form elements are rendered correctly', () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(<Login />);

    expect(getByLabelText('Email address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
});