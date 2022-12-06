import React, { createContext, useEffect, useReducer, useState } from 'react';
import { User } from '../types';
import jwtDecode from 'jwt-decode';

const AUTH_TOKEN = 'authToken';

type LoginData = {
  accessToken: string;
  user: User;
};

type UserContextType = {
  user: User | null;
  login: (loginData: LoginData) => void;
  logout: () => void;
};

const initialData = {
  user: null,
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

const authToken = localStorage.getItem(AUTH_TOKEN);
if (authToken) {
  const decodedToken: any = jwtDecode(authToken || '');

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(AUTH_TOKEN);
  } else {
    initialData.user = decodedToken.user;
  }
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(initialData.user);

  const login = (loginData: LoginData) => {
    localStorage.setItem(AUTH_TOKEN, loginData.accessToken);
    setUser(loginData.user);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
