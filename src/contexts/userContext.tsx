import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextProps {
  email?: string;
  token?: string;
  updateUserInfo: (email: string, token: string) => void;
  logout: () => void;
  login: (email: string, token: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  const updateUserInfo = (newEmail: string, newToken: string) => {
    setEmail(newEmail);
    setToken(newToken);
    // Save token to localStorage
    localStorage.setItem('authToken', newToken);
  };

  const logout = () => {
    setEmail(undefined);
    setToken(undefined);
    // Remove token from localStorage
    localStorage.removeItem('authToken');
  };

  const login = (newEmail: string, newToken: string) => {
    updateUserInfo(newEmail, newToken);
  };

  const contextValue: UserContextProps = {
    email,
    token,
    updateUserInfo,
    logout,
    login,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
