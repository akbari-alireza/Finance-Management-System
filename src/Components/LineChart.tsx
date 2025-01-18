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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const data = {
        labels: ['sdfsdf'], 
        datasets: [
            {
                label: "Expenses",
                data: 'dsfds', 
                borderColor: "#767cff",
                fill: false,
            }
        ],
    };

    return <Line data={data} />;
};

export default LineChart;