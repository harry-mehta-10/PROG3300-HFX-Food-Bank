import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FoodBankDetails from './pages/FoodBankDetails';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DBSeeder from './components/DBSeeder';
import './App.css';

function App() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foodbank/:id" element={<FoodBankDetails />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
        {isDevelopment && <DBSeeder />}
      </div>
    </Router>
  );
}

export default App;