import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login'
import Register from './pages/auth/Register';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Register/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>

      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
