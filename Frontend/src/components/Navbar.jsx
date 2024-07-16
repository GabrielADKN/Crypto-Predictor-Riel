import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

/**
 * Renders a navigation bar component that displays different links based on the user's authentication status.
 *
 * @return {JSX.Element} The rendered navigation bar component.
 */
const NavigationBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="light" expand="lg" className="navbar-custom">
            <Navbar.Brand as={Link} to="/" className="navbar-brand">CryptoPredictor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {isAuthenticated ? (
                        <>
                            <Nav.Link as={Link} to="/predict">Predict</Nav.Link>
                            <Button variant="outline-light" onClick={handleLogout} className="ml-2">Logout</Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
