import React from 'react';
import { Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

/**
 * Renders a form group with days slider for selecting the number of days.
 *
 * @param {number} days - The number of days selected.
 * @param {function} setDays - A function to update the selected number of days.
 * @return {JSX.Element} The rendered form group with days slider.
 */
const DaysSlider = ({ days, setDays }) => (
  <Form.Group controlId="days" className="mt-3">
    <Form.Label>Days</Form.Label>
    <RangeSlider
      value={days}
      onChange={e => setDays(e.target.value)}
      min={1}
      max={14}
      tooltip="auto"
    />
    <div className="text-center mt-2">Selected Days: {days}</div>
  </Form.Group>
);

export default DaysSlider;
