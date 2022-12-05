import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
