import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Income from './Pages/Income';
import Expense from './Pages/Expense';
import Dashboard from './Pages/Dashboard';
import axios from 'axios';
import Registration from './Components/Registration';
import Login from './Components/Login';
import PageNotFound from './Components/PageNotFound';

interface User {
  email: string;
  userExpense?: ExpenseProps[];
  userIncome?: IncomeProps[];
}

interface IncomeProps {
  id: number;
  title: string;
  amount: number;
  date: string;
}
interface ExpenseProps {
  id: number;
  title: string;
  amount: number;
  date: string;
}

function App() {
  const [incomes, setIncomes] = useState<User[]>([]);
  const [expenses, setExpenses] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const currency = "$";
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesRes, incomesRes] = await Promise.all([
          axios.get('http://localhost:3000/users'),
          axios.get('http://localhost:3000/users')
        ]);
        
        setExpenses(expensesRes.data);
        setIncomes(incomesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    }
  }, []);

  const userExpenses = user ? (expenses.find((u) => u.email === user.email)?.userExpense || []) : [];
  const userIncomes = user ? (incomes.find((u) => u.email === user.email)?.userIncome || []) : [];

  return (
    <Router>
      {loading ? <h1>Loading...</h1> : (
        <Routes>
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/incomes' element={<Income incomes={userIncomes} setIncomes={setIncomes} currency={currency} />} />
          <Route path='/expense' element={<Expense expenses={userExpenses} setExpenses={setExpenses} currency={currency} />} />
          <Route path='/dashboard' element={<Dashboard expenses={userExpenses} incomes={userIncomes} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
