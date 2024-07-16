import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * Renders a form group with a select input for selecting a cryptocurrency.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.coins - An array of strings representing the available cryptocurrencies.
 * @param {string} props.coinId - The currently selected cryptocurrency.
 * @param {function} props.setCoinId - A function to update the selected cryptocurrency.
 * @return {JSX.Element} The rendered form group with a select input.
 */
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
