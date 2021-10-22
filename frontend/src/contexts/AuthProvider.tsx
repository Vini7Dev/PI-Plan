import React, { createContext, useCallback, useState } from 'react';

import api from '../services/api';

interface IUser {
  id: string;
  user_type: 'admin' | 'assembler';
  name: string;
  username: string;
  cellphone?: string;
}

interface ISectionData {
  token: string;
  user: IUser;
}

interface ILoginCredentials {
  username: string;
  password: string;
}

interface IAuthContext {
  user: IUser;
  login(credentials: ILoginCredentials): Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
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

    setData(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, login }}>
      { children }
    </AuthContext.Provider>

  );
}

export default AuthProvider;
