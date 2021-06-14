import axios from 'axios';
import Router from 'next/router';
import { setCookie } from 'nookies';
import { createContext, ReactNode, useState } from 'react';

interface User {
  id: number,
  name: string,
  email: string,
  imageUrl: string,
  roles: [string]
}

interface signInData {
  email: string,
  password: string
}

interface AuthContextData {
  user: User,
  isAuthenticated: boolean,
  signIn: (data: signInData) => Promise<void>,
}

interface AuthContextProviderProps {
  children: ReactNode,
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function signIn({ email, password }: signInData) {
    const { data } = await axios.post('http://127.0.0.1:8000/auth/sign-in', {
      username: email,
      password,
    });

    setUser(data.user);
    setCookie(undefined, 'podcastr.token', data.token, {
      maxAge: 3600 * 1, // 1 hour
    });

    Router.push('/home');
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signIn,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
