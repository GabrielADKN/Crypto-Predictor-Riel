import React from 'react';
import { Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

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
