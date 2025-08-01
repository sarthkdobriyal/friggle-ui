/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { unauthClient, authClient } from '../utils/api-client';

interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate token with backend
      authClient.get('/auth/me')
        .then(response => {
          if (response.data.success) {
            setUser({
              id: response.data.user._id,
              name: `${response.data.user.firstName} ${response.data.user.lastName}`,
              email: response.data.user.email,
              credits: response.data.user.credits || 0
            });
          }
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem('authToken');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await unauthClient.post('/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        const userData = response.data.user;
        const newUser: User = {
          id: userData._id,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          credits: userData.credits || 0
        };
        
        setUser(newUser);
        localStorage.setItem('authToken', response.data.token);
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Split name into firstName and lastName
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const response = await unauthClient.post('/auth/register', {
        username: email, // Using email as username for simplicity
        email,
        password,
        firstName,
        lastName
      });

      if (response.data.success) {
        const userData = response.data.user;
        const newUser: User = {
          id: userData._id,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          credits: userData.credits || 50
        };
        
        setUser(newUser);
        localStorage.setItem('authToken', response.data.token);
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint
      await unauthClient.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if backend call fails
      console.warn('Logout API call failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
