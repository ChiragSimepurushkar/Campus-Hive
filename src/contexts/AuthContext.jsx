// /client/src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Auth/auth.jsx'; // Updated to .jsx

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
        const response = await auth.login({ email, password });
        const newToken = response.data.token;
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};