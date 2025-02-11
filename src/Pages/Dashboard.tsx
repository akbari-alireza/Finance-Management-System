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
    <div className='flex justify-center items-center h-[70vh]'>
      <div className=' flex  items-center md:flex-row flex-col lg:w-[80%] justify-center'>
        <div className='w-[100%]'>
          <IncomeChart incomes={incomes} />
        </div>
        <div className='w-[100%]'>
          <ExpenseChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;