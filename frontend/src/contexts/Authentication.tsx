import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

export interface IAuthUser {
  id: string;
  user_type: 'admin' | 'assembler';
  name: string;
  username: string;
  cellphone?: string;
}

interface ISectionData {
  token: string;
  user: IAuthUser;
}

interface ILoginCredentials {
  username: string;
  password: string;
}

interface IAuthContext {
  user: IAuthUser;
  login(credentials: ILoginCredentials): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ISectionData>(() => {
    const token = localStorage.getItem('@PI-Plan:token');
    const user = localStorage.getItem('@PI-Plan:user');

    if(token && user) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as ISectionData;
  });

  const login = useCallback(async ({ username, password }: ILoginCredentials) => {
    const response = await api.post<ISectionData>('/sections', {
      username,
      password,
    });

    localStorage.setItem('@PI-Plan:token', response.data.token);
    localStorage.setItem('@PI-Plan:user', JSON.stringify(response.data.user));

    setData(response.data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@PI-Plan:token');
    localStorage.removeItem('@PI-Plan:user');

    setData({} as ISectionData);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, login, logout }}>
      { children }
    </AuthContext.Provider>

  );
}

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  return context;
}
