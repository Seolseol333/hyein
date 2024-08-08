import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Assignment from './pages/Assignment/Assignment';
import AssignmentDetail from './pages/AssignmentDetail/AssignmentDetail';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Assignment" element={<Assignment />} />
          <Route path="/AssignmentDetail" element={<AssignmentDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
