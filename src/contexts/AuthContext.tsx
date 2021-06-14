import { createContext, ReactNode, useState } from 'react';


interface AuthContextData {
  isAuthenticated: boolean,
}

interface AuthContextProviderProps {
  children: ReactNode,
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
