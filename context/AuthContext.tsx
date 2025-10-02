
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';
import { MOCK_USERS } from '../constants/data';

interface LoginResult {
  user?: User;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<LoginResult>;
  logout: () => void;
  register: (name: string, email: string, pass: string) => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const USERS_STORAGE_KEY = 'eagleseye_users';
const CURRENT_USER_STORAGE_KEY = 'eagleseye_user';

const getInitialUsers = (): User[] => {
  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
  } catch (error) {
    console.error("Failed to parse users from localStorage", error);
  }
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(MOCK_USERS));
  return MOCK_USERS;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(getInitialUsers);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for a logged-in user on initial load
    const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse current user from localStorage", error);
        localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
      }
    }
  }, []);

  const login = async (email: string, pass: string): Promise<LoginResult> => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser && foundUser.password === pass) {
      setUser(foundUser);
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(foundUser));
      return { user: foundUser }; // Return user on success
    }
    return { error: 'Invalid email or password.' }; // Return error on failure
  };
  
  const register = async (name: string, email: string, pass: string): Promise<string | null> => {
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
        return 'An account with this email already exists.';
    }

    const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        password: pass,
        role: Role.CUSTOMER,
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    // Automatically log in the new user
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(newUser));
    
    return null; // No error
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
