
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => {
//   // return useContext(AuthContext);
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   } 
//   return context;
// };


// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       try{
//       setUser(JSON.parse(userData));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }catch (error) {
//       console.error('Error parsing user data:', error);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//     }
//   }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       const { user: userData, token } = response.data;
      
//       setUser(userData);
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       return { success: true };
//     } catch (error) {
//       return { 
//         success: false, 
//         error: error.response?.data?.message || 'Login failed' 
//       };
//     }
//   };

//   const register = async (username, email, password) => {
//     try {
//       const response = await axios.post('/api/auth/register', { 
//         username, email, password 
//       });
//       const { user: userData, token } = response.data;
      
//       setUser(userData);
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       return { success: true };
//     } catch (error) {
//       return { 
//         success: false, 
//         error: error.response?.data?.message || 'Registration failed' 
//       };
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   const value = {
//     user,
//     login,
//     register,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app start
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
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

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};