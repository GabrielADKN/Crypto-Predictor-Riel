import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const PredictionsList = ({ dates, predictions }) => (
    <Card className="mt-3 shadow">
        <Card.Body>
            <Card.Title>Predictions</Card.Title>
            <ListGroup variant="flush">
                {dates.map((date, index) => (
                    <ListGroup.Item key={date}>{date}: ${predictions[index].toFixed(2)}</ListGroup.Item>
                ))}
            </ListGroup>
        </Card.Body>
    </Card>
);

export default PredictionsList;
