import React, { useState } from 'react';
import LineChart from '../Components/LineChart'; // Adjust the path as needed

const Dashboard = () => {

  return (
    <div className='flex flex-col items-center'>
      <div className='w-1/2'>
        <LineChart /> {/* This will now display the sample chart */}
      </div>

    </div>
  );
};

export default Dashboard;