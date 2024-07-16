import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

/**
 * Renders the homepage component.
 *
 * @return {JSX.Element} The rendered homepage component.
 */
const Home = () => {
  return (
    <Container className="mt-5">
      <Card className="text-center p-4">
        <Card.Body>
          <Card.Title>Welcome to CryptoPredictor</Card.Title>
          <Card.Text>
            Your ultimate tool for predicting cryptocurrency prices. Log in to get started or register if you don't have an account yet.
          </Card.Text>
          <Button href="/login" variant="primary" className="mr-2">Login</Button>
        <Button href="/register" variant="secondary" className="mx-2">Register</Button>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
