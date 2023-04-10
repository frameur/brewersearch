import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import About from './pages/About'
import Historybeer from './pages/Historybeer'
import Home from './pages/Home'
import Signup from './Signup'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/histoire" element={<Historybeer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
