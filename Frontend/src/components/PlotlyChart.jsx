import React from 'react';
import Plot from 'react-plotly.js';

const PlotlyChart = ({ plotData }) => (
    <div className="plot-container mt-3">
        <Plot data={plotData.data} layout={plotData.layout} />
    </div>
);

export default PlotlyChart;
