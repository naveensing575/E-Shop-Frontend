import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextProps {
  uid?: string;
  name?: string;
  email?: string;
  updateUserInfo: (uid: string, name: string, email: string) => void;
  clearUserInfo: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [uid, setUid] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const updateUserInfo = (newUid: string, newName: string, newEmail: string) => {
    setUid(newUid);
    setName(newName);
    setEmail(newEmail);
  };

  const clearUserInfo = () => {
    setUid(undefined);
    setName(undefined);
    setEmail(undefined);
  };

  const contextValue: UserContextProps = {
    uid,
    name,
    email,
    updateUserInfo,
    clearUserInfo,
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
