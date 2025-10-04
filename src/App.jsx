// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './App.css';

axios.defaults.baseURL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  // if (loading) {
  //   return <div className="loading">Loading...</div>;
  // }
   if (loading) {
    return (
      <div className="loading" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        Loading...
      </div>
    );
  }


  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={logout} />
        <main>
        {/* <Routes>
          <Route 
            path="/" 
            element={user ? <Dashboard /> : <Navigate to="/courses" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={login} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register onLogin={login} /> : <Navigate to="/" />} 
          />
          <Route path="/courses" element={<CourseList user={user} />} />
          <Route path="/courses/:id" element={<CourseDetail user={user} />} />
          
        </Routes> */}

         <Routes>
            {/* Default route - redirect to login if not authenticated, courses if authenticated */}
            <Route 
              path="/" 
              element={user ? <Navigate to="/courses" /> : <Navigate to="/login" />} 
            />
            
            {/* Auth routes - redirect to courses if already logged in */}
            <Route 
              path="/login" 
              element={!user ? <Login onLogin={login} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register onLogin={login} /> : <Navigate to="/courses" />} 
            />
            
            {/* Protected routes */}
            <Route 
              path="/courses" 
              element={user ? <CourseList user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/courses/:id" 
              element={user ? <CourseDetail user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

{/* <Router>
      <div className="App">
        <Navbar user={user} onLogout={logout} />
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to={user ? "/dashboard" : "/courses"} />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={login} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register onLogin={login} /> : <Navigate to="/dashboard" />} 
          />
          <Route path="/courses" element={<CourseList user={user} />} />
          <Route path="/courses/:id" element={<CourseDetail user={user} />} />
        </Routes>
      </div>
    </Router>
  );
} */}

export default App;