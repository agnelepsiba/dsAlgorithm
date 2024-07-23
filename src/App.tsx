import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProgramPage from './components/ProgramPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/program/:taskId" element={<ProgramPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
