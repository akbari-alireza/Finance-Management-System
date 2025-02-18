import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExpenseChart from '../Components/ExpenseChart';
import IncomeChart from '../Components/IncomeChart';
import Navbar from '../Components/Navbar';

type Transaction = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userData = JSON.parse(user);
        const res = await axios.get(`http://localhost:3000/users/${userData.id}`);

        if (res.data) {
          setExpenses(res.data.userExpense || []);
          setIncomes(res.data.userIncome || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center h-[70vh] '>
        <div className='flex items-center max-w-[1300px] md:flex-row flex-col lg:w-[80%] justify-center'>
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
