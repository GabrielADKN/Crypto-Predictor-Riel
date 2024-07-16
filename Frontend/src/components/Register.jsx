import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

/**
 * Handles the form submission for user registration.
 *
 * @param {Event} e - The form submit event.
 * @return {Promise<void>} Promise that resolves after handling the form submission.
 */
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', { username, email, password });
            navigate('/login');
        } catch (error) {
            setError(error.response.data.message || 'Registration failed');
        }
    };

    return (
        <Container className="mt-5">
            <h1>Register</h1>
            <Card className="p-4 shadow">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mt-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    <Button variant="primary" type="submit" className="mt-3">Register</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Register;
