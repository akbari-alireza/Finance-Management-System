import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Income from './Pages/Income'
import Navbar from './Components/Navbar'
import Expense from './Pages/Expense'
import Dashboard from './Pages/Dashboard'
import axios from 'axios'
function App() {

  const [incomes, setIncomes] = useState([]);
  useEffect(() =>{
    axios.get('http://localhost:3001/Income')
    .then(res => setIncomes(res.data))
    .catch(err => console.error(err))
  }, [])

  const curency = "$"


  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Income incomes={incomes} setIncomes={setIncomes} curency={curency}/>}  />
        <Route path='/expense' element={<Expense/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App