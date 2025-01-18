import ExpenseChart from '../Components/ExpenseChart';
import IncomeChart from '../Components/IncomeChart';

type ExpenseProps = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

type Props = {
  incomes: ExpenseProps[];
  expenses: ExpenseProps[];
}

const Dashboard = ({ expenses, incomes }: Props) => {
  return (
    <div className=' flex  items-center md:flex-row flex-col justify-center'>
      <div className='w-[100%] sm:w-[50%] '>
        <IncomeChart incomes={incomes} />
      </div>
      <div className='w-[100%] sm:w-[50%] '>
        <ExpenseChart  expenses={expenses} />
      </div>
    </div>
  );
};

export default Dashboard;