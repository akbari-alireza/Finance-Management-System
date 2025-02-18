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
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};
const LineChart = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  useEffect(() => {
    const fetchUserExpences = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (!user.id) {
          console.log("User not fount!");
          return;
        }
        const res = await axios.get(`http://localhost:3000/users/${user.id}`);
        setExpenses(res.data.userExpense || [])
      } catch (error) {
        console.error("Error fetching user expenses:", error)
      }
    };
    fetchUserExpences();
  },[]);

  const chartData = {
    labels: expenses.map(item => `${item.date} - ${item.title}`),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map(item => item.amount),
        borderColor: "#767cff",
        fill: false,
      }
    ],
  };



  return (
    <Line className='w-[30%]' data={chartData} />
  );
};

export default LineChart;