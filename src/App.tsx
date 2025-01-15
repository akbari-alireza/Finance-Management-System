import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Income from './Pages/Income'
import Navbar from './Components/Navbar'
import Expense from './Pages/Expense'
import Dashboard from './Pages/Dashboard'
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Income/>} />
        <Route path='/expense' element={<Expense/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App