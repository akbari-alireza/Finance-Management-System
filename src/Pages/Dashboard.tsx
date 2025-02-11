import { useNavigate } from 'react-router-dom';
import ExpenseChart from '../Components/ExpenseChart';
import IncomeChart from '../Components/IncomeChart';
import Navbar from '../Components/Navbar';
import { useEffect } from 'react';

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

  const usenavigate = useNavigate();
  useEffect(() => {
    let user = sessionStorage.getItem('user');
    if(user === '' || user === null){
      usenavigate('/');
    }
  }, [])
  return (
    <div>
      <Navbar />
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
    </div>

  );
};

export default Dashboard;