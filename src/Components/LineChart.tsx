import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import ChartData from './ChartData'; // Adjust path as necessary

// Register the necessary components with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineChart = () => {
    // Define chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Weekly Steps', // Title of your chart
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days of the Week', // Label for the x-axis
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Steps', // Label for the y-axis
                },
            },
        },
    };

    return <Line options={options} data={ChartData} />;
};