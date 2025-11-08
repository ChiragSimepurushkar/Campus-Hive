// /client/src/hooks/useAuth.jsx

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx'; // Updated to .jsx
import { UserContext } from '../contexts/UserContext.jsx'; // Updated to .jsx

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext); 

  if (authContext === undefined || userContext === undefined) {
    throw new Error('useAuth must be used within both AuthProvider and UserProvider');
  }
  
  return { 
    ...authContext, 
    ...userContext
  };
};