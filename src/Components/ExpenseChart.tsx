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

type ExpenseProps = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

type Props = {
  expenses: ExpenseProps[];
};

const ExpenseChart: React.FC<Props> = ({ expenses }) => {
  const data = {
    labels: expenses.map(item => `${item.date} - ${item.title}`),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map(item => item.amount),
        borderColor: "#FF6384",  // A red color for expenses
        fill: false,
      }
    ],
  };

  return (
    <Line className='w-[30%]' data={data} />
  );
};

export default ExpenseChart;
