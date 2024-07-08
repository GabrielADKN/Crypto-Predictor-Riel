import React from 'react';
import { Form } from 'react-bootstrap';

const CoinSelect = ({ coins, coinId, setCoinId }) => (
    <Form.Group controlId="coinId">
        <Form.Label>Cryptocurrency</Form.Label>
        <Form.Control as="select" value={coinId} onChange={(e) => setCoinId(e.target.value)}>
            {coins.map(coin => (
                <option key={coin} value={coin}>{coin}</option>
            ))}
        </Form.Control>
    </Form.Group>
);

export default CoinSelect;
