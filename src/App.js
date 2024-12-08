import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Flipbook from './components/Flipbook';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}>
      <Router>
        <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800">
          <h1 className="text-xl font-bold">IPFS Photobook</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-yellow-500 dark:hover:bg-yellow-600"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/flipbook" element={<Flipbook />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
