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

interface signUpData {
  name: string,
  email: string,
  password: string
}

interface AuthContextData {
  user: User,
  isAdmin: boolean
  isAuthenticated: boolean,
  signIn: (data: signInData) => Promise<void>,
  signUp: (data: signUpData) => Promise<void>,
}

interface AuthContextProviderProps {
  children: ReactNode,
}

const hostname = process.env.NEXT_PUBLIC_API_HOST;

export const AuthContext = createContext({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const isAdmin = !!userInfo?.roles.filter((role) => role === 'ROLE_ADMIN')[0];
  const isAuthenticated = !!userInfo;

  useEffect(() => {
    const { 'podcastr.token': token } = parseCookies();

    if (!token) return;

    axios.get(`${hostname}/user`, {
      headers: { authorization: `Bearer ${token}` },
    }).then((response) => setUserInfo(response.data));
  }, []);

  async function signIn({ email, password }: signInData) {
    const { data } = await axios.post(`${hostname}/auth/sign-in`, {
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

  async function signUp({ name, email, password }: signUpData) {
    await axios.post(`${hostname}/auth/sign-up`, {
      name,
      email,
      password,
    });

    await signIn({ email, password });
  }

  return (
    <AuthContext.Provider value={{
      user: userInfo,
      isAdmin,
      isAuthenticated,
      signIn,
      signUp,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
