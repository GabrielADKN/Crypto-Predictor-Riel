import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

/**
 * Renders a login form and handles the submission of the form to authenticate the user.
 *
 * @return {JSX.Element} The rendered login form.
 */
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
            login({ token: access_token });
            navigate('/predict');
        } catch (error) {
            setError(error.response.data.message || 'Login failed');
        }
    };

    return (
        <Container className="mt-5">
            <h1>Login</h1>
            <Card className="p-4 shadow">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
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
                    <Button variant="primary" type="submit" className="mt-3">Login</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;
