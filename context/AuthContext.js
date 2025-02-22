// context/AuthContext.js
"use client" // This is a client component
import React, { createContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs'; // Or however you access user data

const AuthContext = createContext({
  isAuthenticated: false,
  user: null, // Store user object
  setIsAuthenticated: () => {}, // Placeholder function
  setUser: () => {}, // Placeholder function
});

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser(); // Clerk user data

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    if (isLoaded) { // Check if user data is loaded from Clerk
      setIsAuthenticated(isSignedIn);
      setUser(user); // Set the Clerk user object
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user: currentUser, setIsAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// Create a custom hook for easier access
export const useAuth = () => {
  return React.useContext(AuthContext);
};