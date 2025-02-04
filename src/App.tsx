import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { Housing } from './pages/Housing';
import { Login } from './pages/Login';
import { Forum } from './pages/Forum';
import { Events } from './pages/Events';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {/* Navbar remains sticky at the top */}
        <Navbar />
        
        {/* Page content area with padding */}
        <main className="pt-16 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;