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

type IncomeProps = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

type Props = {
  incomes: IncomeProps[];
};

const LineChart: React.FC<Props> = ({ incomes }) => {
  const data = {
    labels: incomes.map(item => `${item.date} - ${item.title}`),
    datasets: [
      {
        label: "Incomes",
        data: incomes.map(item => item.amount),
        borderColor: "#767cff",
        fill: false,
      }
    ],
  };

  return (
    <Line className='w-[30%]' data={data} />

  );
};

export default LineChart;