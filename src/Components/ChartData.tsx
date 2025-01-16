import React from 'react';

const ChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  datasets: [ // Change 'Database' to 'datasets'
    {
      label: "Steps",
      data: [3000, 5000, 2000, 2300, 4000, 6000, 8000], // Corrected key and values
      borderColor: "#767cff",
      fill: false, // Optional: Set to true if you want to fill under the line
    }
  ]
};

export default ChartData;