import React from 'react';
import Plot from 'react-plotly.js';

/**
 * Renders a Plotly chart component with the provided plot data.
 *
 * @param {Object} plotData - The data and layout for the plot.
 * @return {JSX.Element} The rendered Plotly chart component.
 */
const PlotlyChart = ({ plotData }) => (
    <div className="plot-container mt-3">
        <Plot data={plotData.data} layout={plotData.layout} />
    </div>
);

export default PlotlyChart;
