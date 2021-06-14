import axios from 'axios';
import Router from 'next/router';
import { setCookie, parseCookies } from 'nookies';
import {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import api from '../services/api';

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

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const isAuthenticated = !!userInfo;

  useEffect(() => {
    const { 'podcastr.token': token } = parseCookies();

    if (!token) return;

    axios.get('http://127.0.0.1:8000/user', {
      headers: { authorization: `Bearer ${token}` },
    }).then((response) => setUserInfo(response.data));
  }, []);

  async function signIn({ email, password }: signInData) {
    const { data } = await axios.post('http://127.0.0.1:8000/auth/sign-in', {
      username: email,
      password,
    });

    const { user, token } = data;

    setUserInfo(user);
    setCookie(undefined, 'podcastr.token', token, {
      maxAge: 3600 * 1, // 1 hour
    });

    api.defaults.headers.Authorization = `Bearer ${token}`;

    Router.push('/home');
  }

  return (
    <AuthContext.Provider value={{
      user: userInfo,
      isAuthenticated,
      signIn,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
