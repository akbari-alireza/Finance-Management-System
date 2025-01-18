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
type Props1 = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

type Props = {
  expenses: Props1[];
}
const LineChart = ({ expenses }: Props) => {
  const incomes = {
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
    <Line className='w-[30%]' data={incomes} />
  );
};

export default LineChart;