import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Flipbook from './components/Flipbook';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Route for the Flipbook */}
          <Route path="/flipbook" element={<Flipbook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
