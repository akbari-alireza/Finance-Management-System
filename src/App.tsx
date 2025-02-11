import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Income from './Pages/Income'
import Navbar from './Components/Navbar'
import Expense from './Pages/Expense'
import Dashboard from './Pages/Dashboard'
import axios from 'axios'
import Registration from './Components/Registration'
import Login from './Components/Login'
function App() {

  const [incomes, setIncomes] = useState([]);
  const [loadingIncomes, setLoadingIncomes] = useState(true);
  useEffect(() => {
    axios.get('http://localhost:3000/Income')
      .then(res => {
        setIncomes(res.data);
        setLoadingIncomes(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingIncomes(false);
      })
  }, [])

  const [loadingExpenses, setLoadingExpenses] = useState(true);

  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/Expense')
      .then(res => {
        setExpenses(res.data);
        setLoadingExpenses(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingExpenses(false);
      })
  }, [])
  const currency = "$";


  return (
    <Router>
      <Navbar />
      {loadingIncomes || loadingExpenses ? <h1>Loading...</h1> :
        <Routes>
          <Route path='/' element={<Registration/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/incomes' element={<Income incomes={incomes} setIncomes={setIncomes} currency={currency} />} />
          <Route path='/expense' element={<Expense expenses={expenses} setExpenses={setExpenses} />} />
          <Route path='/dashboard' element={<Dashboard expenses={expenses} incomes={incomes} />} />
          <Route path='*' element={<h1>Not Found</h1>} />

        </Routes>}

    </Router>
  )
}

export default App