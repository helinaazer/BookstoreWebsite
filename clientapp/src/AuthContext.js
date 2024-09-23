import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');

  const checkAuthentication = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/status/', {
        withCredentials: true // Ensure session cookies are sent
      });
      setIsAuthenticated(response.data.isAuthenticated);
      setIsAdmin(response.data.isAdmin);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching user status', error);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUsername('');
    }
  };

  useEffect(() => {
    // Automatically check authentication status when the app loads
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, username, checkAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
