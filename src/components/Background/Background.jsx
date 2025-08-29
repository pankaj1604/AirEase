import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Background.css'
import Home from '../Home/Home'
import Breathe from '../Breathe/Breathe'

const Background = () => {
  return (
    <div className='home-outer-container'>
        <div className="home-container">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/breathing" element={<Breathe />} />
            </Routes>
          </Router>
        </div>
    </div>
  )
}

export default Background
