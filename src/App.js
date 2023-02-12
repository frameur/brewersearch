import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import AffichageMap from './pages/AffichageMap'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/leaflet" element={<AffichageMap />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
