import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddProgress from './pages/AddProgress';
import Achievements from './pages/Achievements';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddProgress />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;