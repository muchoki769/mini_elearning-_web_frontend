
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './CSS/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <Link to={user ? "/courses" : "/"}>🎓 LearnHub</Link>
        </div>
        
        <div className="nav-links">
          {user ? (
            <>
           
              <Link 
                to="/dashboard" 
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Dashboard
              </Link>
                 <Link 
                to="/courses" 
                className={location.pathname === '/courses' ? 'active' : ''}
              >
                Courses
              </Link>
              <span className="welcome-text">Welcome, {user.username}!</span>
              <button onClick={onLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={location.pathname === '/login' ? 'active' : ''}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`btn btn-primary ${location.pathname === '/register' ? 'active' : ''}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
