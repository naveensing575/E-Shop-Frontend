import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextProps {
  user: {
    name?: string;
    email?: string;
    token?: string;
  };
  updateUserInfo: (name: string, email: string, token: string) => void;
  logout: () => void;
  login: (name: string, email: string, token: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ name?: string; email?: string; token?: string }>({});

  const updateUserInfo = (name: string, email: string, token: string) => {
    const newUser = { name, email, token };
    setUser(newUser);
    // Save user info to localStorage
    localStorage.setItem('userInfo', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser({});
    // Remove user info from localStorage
    localStorage.removeItem('userInfo');
  };

  const login = (name: string, email: string, token: string) => {
    updateUserInfo(name, email, token);
  };

  const contextValue: UserContextProps = {
    user,
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
