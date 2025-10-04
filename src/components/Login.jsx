
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ onLogin }) => {
//  const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = async(e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try{
//       const response = await axios.post('/auth/login', formData);
//       onLogin(response.data.user, response.data.token);
//       navigate('/');
//     } catch (error) {
//      setError(error.response?.data?.message || 'Login failed');
//     } finally {
//         setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//         <div className="auth-form">
//         <h2>Login to Your Account</h2>
//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit}>
//              <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//            <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//            <button type="submit" disabled={loading} className="btn btn-primary">
//             {loading ? 'Logging in...' : 'Login'}
//           </button>

//         </form>

//          <p>
//           Don't have an account? <Link to="/register">Register here</Link>
//         </p>
//         </div> 
//     </div>
//   )
// }
// export default Login;


// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      onLogin(response.data.user, response.data.token);
      navigate('/courses'); // Redirect to courses after login
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Welcome Back!</h2>
        <p className="auth-subtitle">Sign in to continue learning</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="btn btn-primary btn-full"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register" className="auth-link">Create one here</Link>
          </p>
        </div>

       
      </div>
    </div>
  );
};

export default Login;